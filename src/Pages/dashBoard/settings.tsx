


import Button from "../../components/common/Button/Button";
import { useState } from "react";
import { User, Lock, Bell, Palette, Trash2 } from "lucide-react";
import Input from "../../components/Input/Input";

export  function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
    { id: "danger", label: "Danger Zone", icon: <Trash2 className="w-4 h-4 text-red-500" /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar Tabs */}
      <aside className="w-60 bg-white shadow-md border-r hidden sm:flex flex-col">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-left text-sm transition ${
              activeTab === tab.id
                ? "bg-indigo-100 text-indigo-600 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <p className="text-gray-500 text-sm mb-6">Update your profile info</p>

            <form className="space-y-4 max-w-lg">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <Input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <Button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save Changes
              </Button>
            </form>
          </div>
        )}

        {activeTab === "security" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Security</h2>
            <p className="text-gray-500 text-sm mb-6">Manage password & login</p>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          </div>
        )}

        {activeTab === "appearance" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          </div>
        )}

        {activeTab === "danger" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Delete Account
            </button>
          </div>
        )}
      </main>
    </div>
  );
}



