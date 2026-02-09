// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   FolderKanban, 
//   Award, 
//   Briefcase, 
//   Mail,
//   Eye,
//   TrendingUp,
//   Users,
//   Activity
// } from 'lucide-react';
// import { projectsAPI, skillsAPI, certificationsAPI, messagesAPI } from '../../services/api';
// import Card from '../common/Card';
// import Loading from '../common/Loading';

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [recentActivity, setRecentActivity] = useState([]);

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       const [projects, skills, certs, messages] = await Promise.all([
//         projectsAPI.getAll(),
//         skillsAPI.getAll(),
//         certificationsAPI.getAll(),
//         messagesAPI.getAll(),
//       ]);

//       setStats({
//         projects: {
//           total: projects.data.length,
//           published: projects.data.filter(p => p.status === 'published').length,
//           draft: projects.data.filter(p => p.status === 'draft').length,
//         },
//         skills: {
//           total: skills.data.length,
//           visible: skills.data.filter(s => s.visible).length,
//         },
//         certifications: {
//           total: certs.data.length,
//         },
//         messages: {
//           total: messages.data.length,
//           unread: messages.data.filter(m => !m.read).length,
//         },
//       });

//       // Mock recent activity
//       setRecentActivity([
//         { action: 'New message received', time: '2 minutes ago', icon: Mail },
//         { action: 'Project published', time: '1 hour ago', icon: FolderKanban },
//         { action: 'Skill updated', time: '3 hours ago', icon: Briefcase },
//       ]);

//     } catch (error) {
//       console.error('Failed to load stats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <Loading />;

//   const statCards = [
//     {
//       title: 'Total Projects',
//       value: stats.projects.total,
//       subtitle: `${stats.projects.published} published`,
//       icon: FolderKanban,
//       color: 'bg-blue-500',
//       trend: '+12%',
//     },
//     {
//       title: 'Skills',
//       value: stats.skills.total,
//       subtitle: `${stats.skills.visible} visible`,
//       icon: Briefcase,
//       color: 'bg-purple-500',
//       trend: '+8%',
//     },
//     {
//       title: 'Certifications',
//       value: stats.certifications.total,
//       subtitle: 'Total earned',
//       icon: Award,
//       color: 'bg-green-500',
//       trend: '+3',
//     },
//     {
//       title: 'Messages',
//       value: stats.messages.total,
//       subtitle: `${stats.messages.unread} unread`,
//       icon: Mail,
//       color: 'bg-red-500',
//       trend: `${stats.messages.unread} new`,
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//           Dashboard
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400">
//           Welcome back! Here's what's happening with your portfolio.
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {statCards.map((stat, index) => (
//           <motion.div
//             key={stat.title}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Card hover className="p-6">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
//                     {stat.title}
//                   </p>
//                   <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
//                     {stat.value}
//                   </h3>
//                   <p className="text-xs text-gray-500 dark:text-gray-500">
//                     {stat.subtitle}
//                   </p>
//                 </div>
//                 <div className={`${stat.color} p-3 rounded-lg`}>
//                   <stat.icon className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//               <div className="mt-4 flex items-center text-sm">
//                 <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
//                 <span className="text-green-500 font-medium">{stat.trend}</span>
//                 <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
//               </div>
//             </Card>
//           </motion.div>
//         ))}
//       </div>

//       {/* Recent Activity & Quick Actions */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Activity */}
//         <Card className="p-6">
//           <div className="flex items-center gap-2 mb-4">
//             <Activity className="w-5 h-5 text-primary-600" />
//             <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//               Recent Activity
//             </h2>
//           </div>
//           <div className="space-y-4">
//             {recentActivity.map((activity, index) => (
//               <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
//                 <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
//                   <activity.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-900 dark:text-white font-medium">
//                     {activity.action}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     {activity.time}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Quick Actions */}
//         <Card className="p-6">
//           <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//             Quick Actions
//           </h2>
//           <div className="grid grid-cols-2 gap-3">
//             <button className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group">
//               <FolderKanban className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mb-2" />
//               <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Add Project
//               </p>
//             </button>
//             <button className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group">
//               <Briefcase className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mb-2" />
//               <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Add Skill
//               </p>
//             </button>
//             <button className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group">
//               <Award className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mb-2" />
//               <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Add Certificate
//               </p>
//             </button>
//             <button className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group">
//               <Eye className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mb-2" />
//               <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 View Portfolio
//               </p>
//             </button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  Award, 
  Briefcase, 
  Mail,
  Eye,
  TrendingUp,
  Activity,
  Plus,
  ArrowRight
} from 'lucide-react';
import { projectsAPI, skillsAPI, certificationsAPI, messagesAPI } from '../../services/api';
import Card from '../common/Card';
import Loading from '../common/Loading';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projects, skills, certs, messages] = await Promise.all([
        projectsAPI.getAll(),
        skillsAPI.getAll(),
        certificationsAPI.getAll(),
        messagesAPI.getAll(),
      ]);

      setStats({
        projects: {
          total: projects.data?.length || 0,
          published: projects.data?.filter(p => p.status === 'published').length || 0,
          draft: projects.data?.filter(p => p.status === 'draft').length || 0,
          featured: projects.data?.filter(p => p.featured).length || 0,
        },
        skills: {
          total: skills.data?.length || 0,
          visible: skills.data?.filter(s => s.visible).length || 0,
          byCategory: {
            frontend: skills.data?.filter(s => s.category === 'frontend').length || 0,
            backend: skills.data?.filter(s => s.category === 'backend').length || 0,
            database: skills.data?.filter(s => s.category === 'database').length || 0,
          }
        },
        certifications: {
          total: certs.data?.length || 0,
          active: certs.data?.filter(c => !c.isExpired).length || 0,
        },
        messages: {
          total: messages.data?.length || 0,
          unread: messages.data?.filter(m => !m.read).length || 0,
          starred: messages.data?.filter(m => m.starred).length || 0,
        },
      });

      // Create recent activity from actual data
      const activity = [];
      
      if (messages.data?.length > 0) {
        const latestMessage = messages.data[0];
        activity.push({
          action: `New message from ${latestMessage.name}`,
          time: getTimeAgo(latestMessage.createdAt),
          icon: Mail,
          color: 'text-red-600'
        });
      }

      if (projects.data?.length > 0) {
        const latestProject = projects.data[0];
        activity.push({
          action: `Project "${latestProject.title}" updated`,
          time: getTimeAgo(latestProject.updatedAt),
          icon: FolderKanban,
          color: 'text-blue-600'
        });
      }

      if (certs.data?.length > 0) {
        const latestCert = certs.data[0];
        activity.push({
          action: `Certificate "${latestCert.title}" added`,
          time: getTimeAgo(latestCert.createdAt),
          icon: Award,
          color: 'text-green-600'
        });
      }

      setRecentActivity(activity);

    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  if (loading) return <Loading fullScreen text="Loading dashboard..." />;

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects.total,
      subtitle: `${stats.projects.published} published, ${stats.projects.draft} draft`,
      icon: FolderKanban,
      color: 'bg-blue-500',
      trend: `${stats.projects.featured} featured`,
      link: '/admin/projects'
    },
    {
      title: 'Skills',
      value: stats.skills.total,
      subtitle: `${stats.skills.visible} visible`,
      icon: Briefcase,
      color: 'bg-purple-500',
      trend: `${stats.skills.byCategory.frontend} frontend`,
      link: '/admin/skills'
    },
    {
      title: 'Certifications',
      value: stats.certifications.total,
      subtitle: `${stats.certifications.active} active`,
      icon: Award,
      color: 'bg-green-500',
      trend: 'All verified',
      link: '/admin/certifications'
    },
    {
      title: 'Messages',
      value: stats.messages.total,
      subtitle: `${stats.messages.unread} unread`,
      icon: Mail,
      color: 'bg-red-500',
      trend: `${stats.messages.starred} starred`,
      link: '/admin/messages',
      highlight: stats.messages.unread > 0
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={stat.link}>
              <Card hover className={`p-6 ${stat.highlight ? 'ring-2 ring-red-500' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {stat.subtitle}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-gray-600 dark:text-gray-400">{stat.trend}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Last 24 hours</span>
          </div>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div className={`p-2 bg-gray-100 dark:bg-gray-800 rounded-lg ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No recent activity
              </p>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Plus className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/admin/projects">
              <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group">
                <FolderKanban className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mb-2 mx-auto" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Add Project
                </p>
              </button>
            </Link>
            <Link to="/admin/skills">
              <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group">
                <Briefcase className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mb-2 mx-auto" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Add Skill
                </p>
              </button>
            </Link>
            <Link to="/admin/certifications">
              <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group">
                <Award className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mb-2 mx-auto" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Add Certificate
                </p>
              </button>
            </Link>
            <Link to="/" target="_blank">
              <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group">
                <Eye className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mb-2 mx-auto" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  View Portfolio
                </p>
              </button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;