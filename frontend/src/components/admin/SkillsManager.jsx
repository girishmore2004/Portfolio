import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Eye, EyeOff, Briefcase } from 'lucide-react';
import { skillsAPI } from '../../services/api';
import Button from '../common/Button';
import Card from '../common/Card';
import Modal from '../common/Modal';
import Loading from '../common/Loading';
import toast from 'react-hot-toast';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend',
    proficiency: 50,
    icon: '',
    color: '#6366f1',
    yearsOfExperience: 0,
    visible: true
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await skillsAPI.getAll();
      setSkills(response.data || []);
    } catch (error) {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await skillsAPI.update(editingSkill._id, formData);
        toast.success('Skill updated successfully!');
      } else {
        await skillsAPI.create(formData);
        toast.success('Skill added successfully!');
      }
      setModalOpen(false);
      resetForm();
      loadSkills();
    } catch (error) {
      toast.error(error.message || 'Failed to save skill');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await skillsAPI.delete(id);
      toast.success('Skill deleted!');
      loadSkills();
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || '',
      color: skill.color || '#6366f1',
      yearsOfExperience: skill.yearsOfExperience || 0,
      visible: skill.visible
    });
    setModalOpen(true);
  };

  const toggleVisibility = async (skill) => {
    try {
      await skillsAPI.update(skill._id, { visible: !skill.visible });
      toast.success(skill.visible ? 'Skill hidden' : 'Skill visible');
      loadSkills();
    } catch (error) {
      toast.error('Failed to update skill');
    }
  };

  const resetForm = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'frontend',
      proficiency: 50,
      icon: '',
      color: '#6366f1',
      yearsOfExperience: 0,
      visible: true
    });
  };

  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(s => s.category === filter);

  const categories = ['all', 'frontend', 'backend', 'database', 'devops', 'tools', 'other'];

  const getCategoryStats = () => {
    return categories.slice(1).map(cat => ({
      name: cat,
      count: skills.filter(s => s.category === cat).length
    }));
  };

  if (loading) return <Loading fullScreen text="Loading skills..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skills Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {skills.length} skill{skills.length !== 1 ? 's' : ''} total • {skills.filter(s => s.visible).length} visible
          </p>
        </div>
        <Button icon={Plus} onClick={() => { resetForm(); setModalOpen(true); }}>
          Add Skill
        </Button>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {getCategoryStats().map((cat) => (
          <Card key={cat.name} className="p-3 text-center">
            <p className="text-2xl font-bold text-primary-600">{cat.count}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{cat.name}</p>
          </Card>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === cat
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
            {cat !== 'all' && (
              <span className="ml-2 text-xs opacity-75">
                ({skills.filter(s => s.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <Card className="p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No skills {filter !== 'all' ? `in ${filter} category` : 'yet'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add your first skill to showcase your expertise
          </p>
          <Button icon={Plus} onClick={() => { resetForm(); setModalOpen(true); }}>
            Add Skill
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className={`p-4 ${!skill.visible ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-1">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: skill.color }}
                    >
                      {skill.icon || skill.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate">
                        {skill.name}
                      </h3>
                      <span className="text-xs text-gray-500 capitalize">{skill.category}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleVisibility(skill)}
                    className="flex-shrink-0"
                  >
                    {skill.visible ? (
                      <Eye className="w-4 h-4 text-green-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Proficiency Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                    <span className="font-medium text-primary-600">{skill.proficiency}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 0.5, delay: index * 0.03 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                </div>

                {skill.yearsOfExperience > 0 && (
                  <p className="text-xs text-gray-500 mb-3">
                    {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} experience
                  </p>
                )}

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    icon={Edit} 
                    onClick={() => handleEdit(skill)} 
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="danger" 
                    icon={Trash}
                    onClick={() => handleDelete(skill._id, skill.name)}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); resetForm(); }}
        title={editingSkill ? 'Edit Skill' : 'Add New Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Skill Name *
            </label>
            <input
              type="text"
              className="input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="React, Node.js, Python..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Category *
              </label>
              <select
                className="input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="devops">DevOps</option>
                <option value="tools">Tools</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Years of Experience
              </label>
              <input
                type="number"
                className="input"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })}
                min="0"
                max="50"
                placeholder="3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Proficiency Level: {formData.proficiency}%
            </label>
            <input
              type="range"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              value={formData.proficiency}
              onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
              min="0"
              max="100"
              step="5"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Beginner (0%)</span>
              <span>Intermediate (50%)</span>
              <span>Expert (100%)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Icon (emoji or text)
              </label>
              <input
                type="text"
                className="input"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="⚛️ or react"
                maxLength={10}
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to use first letter</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Badge Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
                <input
                  type="text"
                  className="input flex-1"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="#6366f1"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <input
              type="checkbox"
              id="visible"
              checked={formData.visible}
              onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <label htmlFor="visible" className="text-sm text-gray-700 dark:text-gray-300">
              Show this skill on portfolio
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="submit" className="flex-1">
              {editingSkill ? 'Update Skill' : 'Create Skill'}
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => { setModalOpen(false); resetForm(); }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SkillsManager;