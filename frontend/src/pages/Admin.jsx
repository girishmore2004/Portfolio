// import { Routes, Route, Link, Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import { 
//   LayoutDashboard, 
//   FolderKanban, 
//   Award, 
//   Briefcase, 
//   Mail, 
//   Settings,
//   LogOut,
//   Menu,
//   X
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { motion } from 'framer-motion';

// // Placeholder admin components
// const Dashboard = () => (
//   <div className="p-8">
//     <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//     <div className="grid md:grid-cols-3 gap-6">
//       <div className="card">
//         <h3 className="text-lg font-semibold mb-2">Total Projects</h3>
//         <p className="text-4xl font-bold text-primary-600">12</p>
//       </div>
//       <div className="card">
//         <h3 className="text-lg font-semibold mb-2">Skills</h3>
//         <p className="text-4xl font-bold text-primary-600">24</p>
//       </div>
//       <div className="card">
//         <h3 className="text-lg font-semibold mb-2">Messages</h3>
//         <p className="text-4xl font-bold text-primary-600">8</p>
//       </div>
//     </div>
//   </div>
// );

// const ProjectsAdmin = () => <div className="p-8"><h1 className="text-3xl font-bold">Manage Projects</h1></div>;
// const SkillsAdmin = () => <div className="p-8"><h1 className="text-3xl font-bold">Manage Skills</h1></div>;
// const CertificationsAdmin = () => <div className="p-8"><h1 className="text-3xl font-bold">Manage Certifications</h1></div>;
// const MessagesAdmin = () => <div className="p-8"><h1 className="text-3xl font-bold">Messages Inbox</h1></div>;
// const SettingsAdmin = () => <div className="p-8"><h1 className="text-3xl font-bold">Settings</h1></div>;

// const Admin = () => {
//   const { user, logout } = useAuth();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const menuItems = [
//     { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
//     { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
//     { icon: Briefcase, label: 'Skills', path: '/admin/skills' },
//     { icon: Award, label: 'Certifications', path: '/admin/certifications' },
//     { icon: Mail, label: 'Messages', path: '/admin/messages' },
//     { icon: Settings, label: 'Settings', path: '/admin/settings' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
//       {/* Sidebar */}
//       <motion.aside
//         initial={{ x: -300 }}
//         animate={{ x: sidebarOpen ? 0 : -300 }}
//         className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${
//           sidebarOpen ? 'block' : 'hidden md:block'
//         }`}
//       >
//         <div className="p-6">
//           <h2 className="text-2xl font-display font-bold text-gradient">Admin Panel</h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{user?.name}</p>
//         </div>

//         <nav className="px-3">
//           {menuItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className="flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
//             >
//               <item.icon className="w-5 h-5" />
//               <span>{item.label}</span>
//             </Link>
//           ))}

//           <button
//             onClick={logout}
//             className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-4"
//           >
//             <LogOut className="w-5 h-5" />
//             <span>Logout</span>
//           </button>
//         </nav>
//       </motion.aside>

//       {/* Main Content */}
//       <div className="flex-1">
//         <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between md:hidden">
//           <button onClick={() => setSidebarOpen(!sidebarOpen)}>
//             {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//           <h1 className="font-bold">Admin</h1>
//           <div className="w-6" />
//         </header>

//         <main className="p-8">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/projects" element={<ProjectsAdmin />} />
//             <Route path="/skills" element={<SkillsAdmin />} />
//             <Route path="/certifications" element={<CertificationsAdmin />} />
//             <Route path="/messages" element={<MessagesAdmin />} />
//             <Route path="/settings" element={<SettingsAdmin />} />
//             <Route path="*" element={<Navigate to="/admin" replace />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Admin;

import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Award, 
  Briefcase, 
  Mail, 
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  Home as HomeIcon,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// Import Admin Components
import AdminDashboard from '../components/admin/Dashboard';
import ProjectsManager from '../components/admin/ProjectsManager';
import SkillsManager from '../components/admin/SkillsManager';
import CertificationsManager from '../components/admin/CertificationsManager';
import ContentManager from '../components/admin/ContentManager';
import MessagesInbox from '../components/admin/MessagesInbox';
import AdminSettings from '../components/admin/Settings';

const Admin = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin', exact: true },
    { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
    { icon: Briefcase, label: 'Skills', path: '/admin/skills' },
    { icon: Award, label: 'Certifications', path: '/admin/certifications' },
    { icon: FileText, label: 'Content', path: '/admin/content' },
    { icon: Mail, label: 'Messages', path: '/admin/messages' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-gradient">Admin Panel</h2>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{user?.name}</p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="p-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200
                    ${isActive(item.path, item.exact)
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>

            {/* User Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                target="_blank"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                View Portfolio →
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/projects" element={<ProjectsManager />} />
            <Route path="/skills" element={<SkillsManager />} />
            <Route path="/certifications" element={<CertificationsManager />} />
            <Route path="/content" element={<ContentManager />} />
            <Route path="/messages" element={<MessagesInbox />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Admin;