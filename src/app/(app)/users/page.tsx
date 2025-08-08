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
    <div className="space-y-4">
      <Topbar
        title="Users"
        right={
          <div className="relative w-full sm:w-72">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Quick search..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600"
              aria-label="Search users"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden>⌕</span>
          </div>
        }
      />

      <SectionCard>
        <div className="sticky top-0 z-10 -mx-4 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:backdrop-blur sm:mx-0">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-700">All users</div>
            <div className="hidden gap-1 sm:flex">
              <button className="rounded-lg px-2 py-1 text-xs text-slate-600 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                Sort by name ↑↓
              </button>
              <button className="rounded-lg px-2 py-1 text-xs text-slate-600 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                Sort by status ↑↓
              </button>
            </div>
          </div>
        </div>

        <Table>
          <thead className="bg-white">
            <tr className="text-xs text-slate-500">
              <th className="sticky left-0 z-10 bg-white px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {current.map((u) => (
              <tr key={u.id} className="transition hover:bg-blue-50/40">
                <td className="sticky left-0 z-10 bg-white px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                      {getInitials(u.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-slate-900">{u.name}</div>
                      <div className="truncate text-xs text-slate-500">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">{u.email}</td>
                <td className="px-4 py-3"><RolePill>{u.role}</RolePill></td>
                <td className="px-4 py-3">
                  {u.status === "Active" ? (
                    <Badge color="green">Active</Badge>
                  ) : (
                    <Badge>Invited</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-2">
                    <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                      View
                    </button>
                    <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Mobile cards */}
        <div className="grid gap-3 px-4 py-4 sm:hidden">
          {current.map((u) => (
            <div key={u.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                  {getInitials(u.name)}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-slate-900">{u.name}</div>
                  <div className="truncate text-xs text-slate-500">{u.email}</div>
                </div>
              </div>
              <div className="mb-2 flex items-center gap-2 text-xs">
                <RolePill>{u.role}</RolePill>
                {u.status === "Active" ? <Badge color="green">Active</Badge> : <Badge>Invited</Badge>}
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  View
                </button>
                <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
          <div>
            Page {page} of {totalPages}
          </div>
          <div className="inline-flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 transition hover:bg-blue-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 transition hover:bg-blue-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}


