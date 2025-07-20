import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  User, 
  LogOut 
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    url: "/worker/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Assignments",
    url: "/worker/assignments",
    icon: Briefcase,
  },
  {
    title: "Tasks",
    url: "/worker/tasks",
    icon: CheckSquare,
  },
];


const WorkerSidebar = ({ onLogout, userData }) => {
  const location = useLocation();
  
  // Automatically determine active item based on current URL
  const activeItem = sidebarItems.find(item => 
    location.pathname.startsWith(item.url)
  )?.title || "Dashboard";

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-cbvt-navy font-khand text-lg font-bold">Cebu Best Value Trading</h2>
            <p className="text-sm text-gray-500">Worker Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-xs uppercase text-gray-500 tracking-wider mb-3 px-2">
            Navigation
          </h3>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-2xl text-gray-700 hover:bg-gray-50 transition-colors ${
                  activeItem === item.title ? "bg-blue-50 text-cbvt-hover-blue font-medium" : ""
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-cbvt-hover-blue" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{userData.user_full_name}</p>
            <p className="text-xs text-gray-600">Worker ID: W{userData.user_id}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-cbvt-hover-blue hover:bg-blue-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default WorkerSidebar;