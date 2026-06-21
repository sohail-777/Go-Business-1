import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { fetchReferrals } from "../api/client";
import { formatDate, formatProfit } from "../utils/format";
import { FaDollarSign, FaCreditCard, FaLink, FaHourglassHalf, FaPercent, FaCoins, FaUsers, FaExchangeAlt } from "react-icons/fa";

const PAGE_SIZE = 10;


function normalizePayload(json) {
  
  const root = json && json.data ? json.data : json;
  
  return {
    metrics: root.metrics || [],
    serviceSummary: root.serviceSummary || {},
    referral: root.referral || {},
    referrals: root.referrals || []
  };
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [serviceSummary, setServiceSummary] = useState({});
  const [referral, setReferral] = useState({});
  const [referrals, setReferrals] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const metricIcons = [
  <FaDollarSign />,
  <FaCreditCard />,
  <FaLink />,
  <FaHourglassHalf />,
  <FaPercent />,
  <FaCoins />,
  <FaUsers />,
  <FaExchangeAlt /> ];

  const loadData = useCallback(async (searchTerm, sortOrder) => {
    setLoading(true);
    setError("");
    try {
      const json = await fetchReferrals({ search: searchTerm, sort: sortOrder });
      const normalized = normalizePayload(json);
      setMetrics(normalized.metrics);
      setServiceSummary(normalized.serviceSummary);
      setReferral(normalized.referral);
      setReferrals(normalized.referrals);
      setPage(1);
    } catch (err) {
      setError(err.message || "Failed to load referrals");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(search, sort);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(search, sort);
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  function handleSortChange(e) {
    const value = e.target.value;
    setSort(value);
    loadData(search, value);
  }

  function handleCopy(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  }

  const total = referrals.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageRows = referrals.slice(startIdx, startIdx + PAGE_SIZE);
  const from = total === 0 ? 0 : startIdx + 1;
  const to = Math.min(startIdx + PAGE_SIZE, total);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Referral Dashboard</h1>
          <p className="dashboard-subtitle">
            Track your referrals, earnings, and partner activity in one place.
          </p>
        </div>

        {error && (
          <div className="error-banner" role="alert">
            {error}
          </div>
        )}

        {/* Overview */}
        <section className="card" role="region" aria-label="Overview metrics">
          <h2 className="card-title">Overview</h2>
          {loading ? (
            <div className="loading-state">Loading...</div>
          ) : (
            <div className="overview-grid">
            {metrics.map((m, index) => (
              <div className="metric-item" key={m.id || m.label}>
                <div className="metric-icon">
                  {metricIcons[index]}
                </div>

                <div className="metric-value">
                  {m.value}
                </div>

                <div className="metric-label">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
          )}
        </section>

      
        <section className="card" aria-label="Service summary">
          <h2 className="card-title">Service summary</h2>
          <div className="service-summary-grid">
            <div className="summary-item">
              <div className="summary-label">Service</div>
              <div className="summary-value">{serviceSummary.service}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Your Referrals</div>
              <div className="summary-value">{serviceSummary.yourReferrals}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Active Referrals</div>
              <div className="summary-value">{serviceSummary.activeReferrals}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Total Ref. Earnings</div>
              <div className="summary-value">{serviceSummary.totalRefEarnings}</div>
            </div>
          </div>
        </section>

        
        <section className="card" aria-label="Share referral">
          <h2 className="card-title">Refer friends and earn more</h2>
          <div className="share-grid">
            <div className="share-field">
              <label htmlFor="referral-link">Your Referral Link</label>
              <div className="share-field-row">
                <input id="referral-link" type="text" readOnly value={referral.link || ""} />
                <button className="btn-copy" onClick={() => handleCopy(referral.link)}>
                  Copy
                </button>
              </div>
            </div>
            <div className="share-field">
              <label htmlFor="referral-code">Your Referral Code</label>
              <div className="share-field-row">
                <input id="referral-code" type="text" readOnly value={referral.code || ""} />
                <button className="btn-copy" onClick={() => handleCopy(referral.code)}>
                  Copy
                </button>
              </div>
            </div>
          </div>
        </section>

      
        <section className="card">
          <h2 className="card-title">All referrals</h2>

          <div className="table-toolbar">
            <input
              type="text"
              className="search-input"
              placeholder="Name or service…"
              aria-label="Search referrals"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <label className="sort-label">
              Sort by date
              <select value={sort} onChange={handleSortChange}>
                <option value="desc">Newest first</option>
                <option value="asc">Oldest first</option>
              </select>
            </label>
          </div>

          {loading ? (
            <div className="loading-state">Loading referrals...</div>
          ) : (
            <>
              <table className="referrals-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="empty-state">
                        No matching entries
                      </td>
                    </tr>
                  ) : (
                    pageRows.map((row) => (
                      <tr
                        key={row.id}
                        onClick={() => navigate(`/referral/${row.id}`)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") navigate(`/referral/${row.id}`);
                        }}
                      >
                        <td>{row.name}</td>
                        <td>{row.serviceName}</td>
                        <td>{formatDate(row.date)}</td>
                        <td className="profit-cell">{formatProfit(row.profit)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div className="table-footer">
                <span>
                  Showing {from}–{to} of {total} entries
                </span>

                <div className="pagination">
                  <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      className={p === page ? "page-active" : ""}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
