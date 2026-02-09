import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MailOpen,
  Trash2,
  Star,
  Archive,
  Search,
  Filter,
  Check,
  X,
  Reply,
  Forward,
  Download,
  RefreshCw,
  Clock,
  User,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
  Inbox,
  Send
} from 'lucide-react';
import api from '../../services/api';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import Modal from '../common/Modal';
import { formatDate } from '../../utils/helpers';

const MessagesInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, starred, archived
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/messages');
      setMessages(response.data || response.messages || []);
    } catch (error) {
      showNotification('Failed to load messages', 'info');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/messages/${id}/read`);
      setMessages(messages.map(msg =>
        msg._id === id ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      showNotification('Failed to mark as read', 'info');
    }
  };

  // const toggleStar = async (id) => {
  //   const message = messages.find(msg => msg._id === id);
  //   try {
  //     await api.put(`/messages/${id}/star`);
  //     setMessages(messages.map(msg =>
  //       msg._id === id ? { ...msg, starred: !msg.starred } : msg
  //     ));
  //   } catch (error) {
  //     showNotification('Failed to update message', 'error');
  //   }
  // };
  const toggleStar = async (id) => {
    try {
      await api.put(`/messages/${id}/star`);
      setMessages(messages.map(msg =>
        msg._id === id ? { ...msg, starred: !msg.starred } : msg
      ));
    } catch (error) {
      showNotification('Failed to update message', 'info');
    }
  };

  const archiveMessage = async (id) => {
    try {
      await api.put(`/messages/${id}/archive`);
      setMessages(messages.map(msg =>
        msg._id === id ? { ...msg, archived: true } : msg
      ));
      showNotification('Message archived', 'success');
    } catch (error) {
      showNotification('Failed to archive message', 'info');
    }
  };

  const deleteMessage = async (id) => {
    try {
      await api.delete(`/messages/${id}`);
      setMessages(messages.filter(msg => msg._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
      showNotification('Message deleted', 'success');
      setShowDeleteModal(false);
    } catch (error) {
      showNotification('Failed to delete message', 'info');
    }
  };

  const deleteSelected = async () => {
    try {
      await Promise.all(selectedMessages.map(id => api.delete(`/messages/${id}`)));
      setMessages(messages.filter(msg => !selectedMessages.includes(msg._id)));
      setSelectedMessages([]);
      showNotification('Messages deleted', 'success');
      setShowDeleteModal(false);
    } catch (error) {
      showNotification('Failed to delete messages', 'info');
    }
  };

  const markAllAsRead = async () => {
  try {
      const unreadIds = filteredMessages.filter(msg => !msg.read).map(msg => msg._id);
      if (unreadIds.length === 0) return;
      await Promise.all(unreadIds.map(id => api.put(`/messages/${id}/read`)));
      setMessages(messages.map(msg =>
        unreadIds.includes(msg._id) ? { ...msg, read: true } : msg
      ));
      showNotification('All messages marked as read', 'success');
    } catch (error) {
      showNotification('Failed to mark messages as read', 'info');
    }
  };

  // const sendReply = async () => {
  //   if (!replyText.trim() || !selectedMessage) return;

  //   try {
  //     // In a real app, you'd send this via email API
  //     console.log('Sending reply to:', selectedMessage.email);
  //     console.log('Reply:', replyText);
      
  //     showNotification('Reply sent successfully!', 'success');
  //     setShowReplyModal(false);
  //     setReplyText('');
  //   } catch (error) {
  //     showNotification('Failed to send reply', 'error');
  //   }
  // };

  const sendReply = async () => {
    if (!replyText.trim() || !selectedMessage) return;
  
    try {
      await api.post(`/messages/${selectedMessage._id}/reply`, {
        replyMessage: replyText
      });
  
      showNotification('Reply sent successfully!', 'success');
      setShowReplyModal(false);
      setReplyText('');
    } catch (error) {
      showNotification('Failed to send reply', 'info');
    }
  };

  const exportMessages = () => {
    const data = JSON.stringify(filteredMessages, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `messages-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Messages exported', 'success');
  };

  const toggleSelectMessage = (id) => {
    setSelectedMessages(prev =>
      prev.includes(id)
        ? prev.filter(msgId => msgId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(msg => msg._id));
    }
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter messages
  const filteredMessages = messages.filter(msg => {
    // Apply filter
    if (filter === 'unread' && msg.read) return false;
    if (filter === 'starred' && !msg.starred) return false;
    if (filter === 'archived' && !msg.archived) return false;
    if (filter === 'all' && msg.archived) return false;

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        msg.name.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query) ||
        msg.subject?.toLowerCase().includes(query) ||
        msg.message?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const stats = {
    total: messages.filter(msg => !msg.archived).length,
    unread: messages.filter(msg => !msg.read && !msg.archived).length,
    starred: messages.filter(msg => msg.starred && !msg.archived).length,
    archived: messages.filter(msg => msg.archived).length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {stats.unread} unread messages
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={exportMessages}>
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button onClick={fetchMessages}>
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-lg flex items-center gap-3 ${
              notification.type === 'success'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          className={`cursor-pointer transition-all ${
            filter === 'all' ? 'ring-2 ring-indigo-600' : ''
          }`}
          onClick={() => setFilter('all')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.total}
              </p>
            </div>
            <Inbox className="w-8 h-8 text-indigo-600" />
          </div>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${
            filter === 'unread' ? 'ring-2 ring-indigo-600' : ''
          }`}
          onClick={() => setFilter('unread')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.unread}
              </p>
            </div>
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${
            filter === 'starred' ? 'ring-2 ring-indigo-600' : ''
          }`}
          onClick={() => setFilter('starred')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Starred</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.starred}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${
            filter === 'archived' ? 'ring-2 ring-indigo-600' : ''
          }`}
          onClick={() => setFilter('archived')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Archived</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.archived}
              </p>
            </div>
            <Archive className="w-8 h-8 text-gray-600" />
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {selectedMessages.length > 0 && (
            <>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 className="w-4 h-4" />
                Delete ({selectedMessages.length})
              </Button>
              <Button variant="secondary" onClick={selectAll}>
                <X className="w-4 h-4" />
                Clear
              </Button>
            </>
          )}
          <Button variant="secondary" onClick={markAllAsRead}>
            <CheckCircle className="w-4 h-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
                onChange={selectAll}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredMessages.length} messages
              </span>
            </div>
          </div>

          {filteredMessages.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <Mail className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No messages found
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredMessages.map((message) => (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedMessage?._id === message._id
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-600'
                      : message.read
                      ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                  }`}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.read) {
                      markAsRead(message._id);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedMessages.includes(message._id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleSelectMessage(message._id);
                      }}
                      className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`font-medium truncate ${
                          message.read
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-900 dark:text-white font-bold'
                        }`}>
                          {message.name}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(message._id);
                          }}
                          className="flex-shrink-0"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              message.starred
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-400 hover:text-yellow-400'
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {message.email}
                      </p>
                      {message.subject && (
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1 truncate">
                          {message.subject}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {message.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
                        <Clock className="w-3 h-3" />
                        {formatDate(message.createdAt)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedMessage.subject || 'No Subject'}
                    </h2>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {selectedMessage.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {selectedMessage.email}
                      </div>
                      {selectedMessage.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {selectedMessage.phone}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button onClick={() => setShowReplyModal(true)}>
                    <Reply className="w-4 h-4" />
                    Reply
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => toggleStar(selectedMessage._id)}
                  >
                    <Star className={selectedMessage.starred ? 'fill-yellow-400' : ''} />
                    {selectedMessage.starred ? 'Unstar' : 'Star'}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => archiveMessage(selectedMessage._id)}
                  >
                    <Archive className="w-4 h-4" />
                    Archive
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedMessages([selectedMessage._id]);
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>

                {/* Message Content */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                {selectedMessage.metadata && (
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Additional Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(selectedMessage.metadata).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-gray-600 dark:text-gray-400">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                          </span>
                          <span className="ml-2 text-gray-900 dark:text-white">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-20">
                <MailOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Select a message
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a message from the list to view its contents
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Messages"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete {selectedMessages.length === 1 ? 'this message' : `${selectedMessages.length} messages`}? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={selectedMessages.length === 1 ? 
                () => deleteMessage(selectedMessages[0]) : 
                deleteSelected
              }
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reply Modal */}
      <Modal
        isOpen={showReplyModal}
        onClose={() => {
          setShowReplyModal(false);
          setReplyText('');
        }}
        title={`Reply to ${selectedMessage?.name}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To: {selectedMessage?.email}
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setShowReplyModal(false);
                setReplyText('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={sendReply}
              disabled={!replyText.trim()}
            >
              <Send className="w-4 h-4" />
              Send Reply
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MessagesInbox;