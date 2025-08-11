"use client";

import { useMemo, useState } from "react";
import Table from "@/components/Table";
import Badge from "@/components/Badge";
import RolePill from "@/components/RolePill";
import Topbar from "@/components/Topbar";
import SectionCard from "@/components/SectionCard";

type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Invited";
};

const MOCK_USERS: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: "2", name: "Bob Lee", email: "bob@example.com", role: "Editor", status: "Invited" },
  { id: "3", name: "Carmen Diaz", email: "carmen@example.com", role: "Viewer", status: "Active" },
  { id: "4", name: "David Kim", email: "david.kim@example.com", role: "Editor", status: "Active" },
  { id: "5", name: "Evelyn Wright", email: "evelyn@example.com", role: "Viewer", status: "Invited" },
  { id: "6", name: "Frank Harris", email: "frank@example.com", role: "Admin", status: "Active" },
  { id: "7", name: "Grace Park", email: "grace@example.com", role: "Viewer", status: "Active" },
  { id: "8", name: "Henry Zhao", email: "henry@example.com", role: "Editor", status: "Active" },
  { id: "9", name: "Isla Patel", email: "isla@example.com", role: "Viewer", status: "Invited" },
  { id: "10", name: "Jack Nguyen", email: "jack@example.com", role: "Editor", status: "Active" },
  { id: "11", name: "Kara Smith", email: "kara@example.com", role: "Viewer", status: "Active" },
  { id: "12", name: "Leo Martin", email: "leo@example.com", role: "Admin", status: "Active" },
  { id: "13", name: "Maya Lopez", email: "maya@example.com", role: "Editor", status: "Invited" },
  { id: "14", name: "Noah Chen", email: "noah@example.com", role: "Viewer", status: "Active" },
  { id: "15", name: "Olivia Brown", email: "olivia@example.com", role: "Editor", status: "Active" },
  { id: "16", name: "Peter Quinn", email: "peter@example.com", role: "Viewer", status: "Active" },
  { id: "17", name: "Quinn Rivera", email: "quinn@example.com", role: "Editor", status: "Invited" },
  { id: "18", name: "Riley Thompson", email: "riley@example.com", role: "Viewer", status: "Active" },
  { id: "19", name: "Sofia Almeida", email: "sofia@example.com", role: "Admin", status: "Active" },
  { id: "20", name: "Theo Brooks", email: "theo@example.com", role: "Viewer", status: "Active" },
];

function getInitials(name: string) {
  const parts = name.split(" ");
  const first = parts[0]?.[0] ?? "";
  const last = parts[1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return MOCK_USERS.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-8 font-lexend">
      {/* Enhanced Topbar */}
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
        <div className="relative bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Users Management
              </h1>
              <p className="text-slate-600 font-medium">Manage your team members and their permissions</p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </div>
            
            {/* Enhanced Search */}
            <div className="relative group w-full sm:w-80">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-focus-within:from-blue-500/20 group-focus-within:to-indigo-500/20 rounded-xl blur transition-all duration-300"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search users..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50/80 border border-slate-200/60 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 focus:bg-white/90 transition-all duration-200 backdrop-blur-sm font-medium"
                  aria-label="Search users"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Users Table Card */}
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
        <div className="relative bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          
          {/* Enhanced Header */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <div className="text-lg font-bold text-slate-800">All Users</div>
                <div className="px-3 py-1 bg-blue-50/80 border border-blue-200/40 rounded-full text-sm font-semibold text-blue-700">
                  {filtered.length} total
                </div>
              </div>
              
              <div className="hidden gap-2 sm:flex">
                <button className="group relative rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-blue-50/80 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 rounded-xl blur transition-all duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <span>Sort by name</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <div className="overflow-x-auto">
            <Table>
              <thead className="bg-slate-50/50">
                <tr className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  <th className="sticky left-0 z-10 bg-slate-50/50 px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60">
                {current.map((u, index) => (
                  <tr key={u.id} className="group transition-all duration-200 hover:bg-blue-50/30">
                    <td className="sticky left-0 z-10 bg-white/90 group-hover:bg-blue-50/30 px-6 py-4 transition-colors duration-200">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                          <div className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-sm font-bold text-blue-700 shadow-md group-hover:scale-110 transition-all duration-200">
                            {getInitials(u.name)}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors duration-200">
                            {u.name}
                          </div>
                          <div className="truncate text-xs text-slate-500 font-medium">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{u.email}</td>
                    <td className="px-6 py-4">
                      <RolePill>{u.role}</RolePill>
                    </td>
                    <td className="px-6 py-4">
                      {u.status === "Active" ? (
                        <Badge color="green">Active</Badge>
                      ) : (
                        <Badge>Invited</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex gap-2">
                        <button className="group relative rounded-lg border border-slate-200/60 bg-white/80 backdrop-blur-sm px-3 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-blue-50/80 hover:border-blue-200/60 hover:text-blue-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 rounded-lg blur transition-all duration-300"></div>
                          <span className="relative">View</span>
                        </button>
                        <button className="group relative rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/50 to-indigo-600/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                          <span className="relative">Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Enhanced Mobile Cards */}
          <div className="grid gap-4 px-6 py-6 sm:hidden">
            {current.map((u) => (
              <div key={u.id} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 rounded-xl blur transition-all duration-300"></div>
                <div className="relative rounded-xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-4 shadow-lg transition-all duration-200 group-hover:shadow-xl group-hover:scale-[1.02]">
                  <div className="mb-3 flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-sm font-bold text-blue-700 shadow-md">
                        {getInitials(u.name)}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-slate-900">{u.name}</div>
                      <div className="truncate text-xs text-slate-500 font-medium">{u.email}</div>
                    </div>
                  </div>
                  <div className="mb-3 flex items-center gap-3 text-xs">
                    <RolePill>{u.role}</RolePill>
                    {u.status === "Active" ? <Badge color="green">Active</Badge> : <Badge>Invited</Badge>}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-lg border border-slate-200/60 bg-white/80 backdrop-blur-sm px-3 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-blue-50/80 hover:border-blue-200/60 hover:text-blue-700">
                      View
                    </button>
                    <button className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Pagination */}
          <div className="flex items-center justify-between border-t border-slate-200/60 bg-slate-50/30 px-6 py-4 text-sm font-medium text-slate-600">
            <div className="flex items-center space-x-2">
              <span>Page {page} of {totalPages}</span>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <span>{filtered.length} users total</span>
            </div>
            <div className="inline-flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="group relative rounded-lg border border-slate-200/60 bg-white/80 backdrop-blur-sm px-4 py-2 font-semibold transition-all duration-200 hover:bg-blue-50/80 hover:border-blue-200/60 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 rounded-lg blur transition-all duration-300"></div>
                <span className="relative">Previous</span>
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="group relative rounded-lg border border-slate-200/60 bg-white/80 backdrop-blur-sm px-4 py-2 font-semibold transition-all duration-200 hover:bg-blue-50/80 hover:border-blue-200/60 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 rounded-lg blur transition-all duration-300"></div>
                <span className="relative">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
