import React, { useState, useEffect } from "react";
import axios from "axios";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 });

  // Base API URL
  const API_URL = "https://codeprep-backend.onrender.com/api/messages";

  // 1. FETCH ALL MESSAGES
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // 2. UPDATE STATS AUTOMATICALLY
  useEffect(() => {
    const unreadCount = messages.filter((m) => !m.read).length;
    setStats({
      total: messages.length,
      unread: unreadCount,
      read: messages.length - unreadCount,
    });
  }, [messages]);

  // 3. TOGGLE READ/UNREAD (API CALL)
  const toggleReadStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axios.patch(`${API_URL}/${id}`, { read: newStatus });

      // Update UI locally
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, read: newStatus } : msg)),
      );

      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, read: newStatus });
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // 4. DELETE MESSAGE (API CALL)
  const deleteMessage = async (id) => {
    if (!window.confirm("Permanently delete this message?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      if (selectedMessage?._id === id) setIsModalOpen(false);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Filtering Logic
  const filteredMessages = messages.filter((msg) => {
    if (filter === "unread") return !msg.read;
    if (filter === "read") return msg.read;
    return true;
  });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        background: "#080808",
        minHeight: "100vh",
        color: "#f0f0f0",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap');
        .fc { font-family: 'Fira Code', monospace; }
        .message-item { transition: all 0.2s ease; cursor: pointer; }
        .message-item:hover { transform: translateX(4px); background: rgba(245,158,11,0.05); }
        .filter-btn.active { background: #f59e0b !important; color: #000 !important; }
      `}</style>

      {/* Navigation */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: "rgba(8,8,8,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(245,158,11,0.15)",
          padding: "16px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 7,
                height: 7,
                background: "#f59e0b",
                borderRadius: "50%",
              }}
            />
            <span style={{ fontWeight: 800, fontSize: 18 }}>
              ADMIN<span style={{ color: "#f59e0b" }}>.</span>PANEL
            </span>
          </div>
          <span className="fc" style={{ fontSize: 11, color: "#f59e0b" }}>
            chamu@dev
          </span>
        </div>
      </nav>

      <main
        style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 32px 60px" }}
      >
        <header style={{ marginBottom: 48 }}>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: 12,
            }}
          >
            Inbox
          </h1>
          <p className="fc" style={{ fontSize: 14, color: "#555" }}>
            Manage your portfolio inquiries
          </p>
        </header>

        {/* Stats Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: "24px",
            }}
          >
            <span className="fc" style={{ fontSize: 11, color: "#555" }}>
              total messages
            </span>
            <p style={{ fontSize: 36, fontWeight: 800 }}>{stats.total}</p>
          </div>
          <div
            style={{
              background: "rgba(245,158,11,0.05)",
              border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: 20,
              padding: "24px",
            }}
          >
            <span className="fc" style={{ fontSize: 11, color: "#f59e0b" }}>
              unread
            </span>
            <p style={{ fontSize: 36, fontWeight: 800, color: "#f59e0b" }}>
              {stats.unread}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {["all", "unread", "read"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`fc filter-btn ${filter === f ? "active" : ""}`}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#888",
                padding: "8px 20px",
                borderRadius: 50,
                cursor: "pointer",
              }}
            >
              /{f}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {loading ? (
            <p className="fc" style={{ color: "#555" }}>
              Syncing with MongoDB...
            </p>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg._id}
                className="message-item"
                onClick={() => {
                  setSelectedMessage(msg);
                  setIsModalOpen(true);
                }}
                style={{
                  background: msg.read
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(245,158,11,0.04)",
                  border: msg.read
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(245,158,11,0.2)",
                  borderRadius: 16,
                  padding: "20px 24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <h3 style={{ fontSize: 18, fontWeight: 700 }}>
                        {msg.name}
                      </h3>
                      {!msg.read && (
                        <span
                          style={{
                            background: "#f59e0b",
                            color: "#000",
                            fontSize: 9,
                            padding: "2px 8px",
                            borderRadius: 20,
                            fontWeight: 800,
                          }}
                        >
                          NEW
                        </span>
                      )}
                    </div>
                    <p style={{ color: "#888", fontSize: 14, marginBottom: 8 }}>
                      {msg.message.substring(0, 100)}...
                    </p>
                    <span
                      className="fc"
                      style={{ fontSize: 10, color: "#444" }}
                    >
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReadStatus(msg._id, msg.read);
                      }}
                      style={{
                        background: msg.read
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(34,197,94,0.1)",
                        border: "1px solid transparent",
                        color: msg.read ? "#666" : "#22c55e",
                        padding: "6px 12px",
                        borderRadius: 8,
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                      className="fc"
                    >
                      {msg.read ? "Mark Unread" : "Mark Read"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(msg._id);
                      }}
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        border: "none",
                        color: "#ef4444",
                        padding: "6px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {isModalOpen && selectedMessage && (
        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(12px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 700,
              width: "100%",
              background: "#0f0f0f",
              border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: 28,
              padding: 40,
            }}
          >
            <h2 style={{ marginBottom: 4 }}>{selectedMessage.name}</h2>
            <p
              className="fc"
              style={{ color: "#f59e0b", marginBottom: 24, fontSize: 13 }}
            >
              {selectedMessage.email}
            </p>
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                padding: 24,
                borderRadius: 16,
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  lineHeight: 1.7,
                  color: "#c8c8c8",
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedMessage.message}
              </p>
            </div>
            <div
              style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}
            >
              <button
                onClick={() =>
                  (window.location.href = `mailto:${selectedMessage.email}`)
                }
                style={{
                  background: "#f59e0b",
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Reply
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "none",
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: 12,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
