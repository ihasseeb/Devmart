import { useState, useEffect } from "react";
import { Search, UserMinus, ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";
import { getAllUsers, updateUserRole, deleteUser } from "../../services/userApi";
import { type User } from "../../services/userApi";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
      setError("Failed to load users from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleRole = async (id: string, currentRole: "admin" | "user") => {
    const targetRole = currentRole === "admin" ? "user" : "admin";
    if (window.confirm(`Change role to ${targetRole === "admin" ? "Admin" : "User"}?`)) {
      try {
        const updated = await updateUserRole(id, targetRole);
        setUsers(users.map((u) => (u._id === id ? updated : u)));
      } catch (err: any) {
        console.error("Failed to toggle role:", err);
        const errMsg = err.response?.data?.message || "Failed to toggle user role.";
        alert(errMsg);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((u) => u._id !== id));
      } catch (err: any) {
        console.error("Failed to delete user:", err);
        const errMsg = err.response?.data?.message || "Failed to remove user.";
        alert(errMsg);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Users</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role === "admin" ? (
                          <ShieldCheck className="w-3 h-3" />
                        ) : (
                          <ShieldAlert className="w-3 h-3" />
                        )}
                        {user.role === "admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <button
                        onClick={() => toggleRole(user._id, user.role)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title={
                          user.role === "admin"
                            ? "Demote to User"
                            : "Promote to Admin"
                        }
                      >
                        {user.role === "admin" ? (
                          <ShieldAlert className="w-4 h-4" />
                        ) : (
                          <ShieldCheck className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <UserMinus className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
