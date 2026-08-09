import React, { useState, useEffect, useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CATEGORIES = ["General", "Work", "Personal", "Ideas", "Todo"];
const PRESET_COLORS = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#8B5CF6"];

function Dashboard() {
  const { backendUrl, isLoggedin } = useContext(AppContent);
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDateFilter, setSelectedDateFilter] = useState(null); // Date object or null

  // Calendar navigation
  const [currentDate, setCurrentDate] = useState(new Date());

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [noteForm, setNoteForm] = useState({
    title: "",
    description: "",
    category: "General",
    color: "#4F46E5",
    completed: false,
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedin) {
      navigate("/login");
    } else {
      fetchNotes();
    }
  }, [isLoggedin]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/note/get");
      if (data.success) {
        setNotes(data.notes);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setNoteForm({
      title: "",
      description: "",
      category: "General",
      color: "#4F46E5",
      completed: false,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (note) => {
    setModalMode("edit");
    setActiveNoteId(note._id);
    setNoteForm({
      title: note.title,
      description: note.description,
      category: note.category || "General",
      color: note.color || "#4F46E5",
      completed: note.completed || false,
    });
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === "create") {
        const { data } = await axios.post(backendUrl + "/api/note/create", noteForm);
        if (data.success) {
          toast.success(data.message);
          setShowModal(false);
          fetchNotes();
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/note/update", {
          noteId: activeNoteId,
          ...noteForm,
        });
        if (data.success) {
          toast.success(data.message);
          setShowModal(false);
          fetchNotes();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleTaskCompletion = async (note) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/note/update", {
        noteId: note._id,
        completed: !note.completed,
      });
      if (data.success) {
        toast.success(note.completed ? "Task marked active" : "Task marked completed!");
        fetchNotes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const { data } = await axios.post(backendUrl + "/api/note/delete", { noteId });
      if (data.success) {
        toast.success(data.message);
        fetchNotes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Filter notes based on category, search, and calendar date selection
  const filteredNotes = notes.filter((note) => {
    const matchesCategory = selectedCategory === "All" || note.category === selectedCategory;
    
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    let matchesDate = true;
    if (selectedDateFilter) {
      const noteDate = new Date(note.createdAt);
      matchesDate =
        noteDate.getFullYear() === selectedDateFilter.getFullYear() &&
        noteDate.getMonth() === selectedDateFilter.getMonth() &&
        noteDate.getDate() === selectedDateFilter.getDate();
    }
    
    return matchesCategory && matchesSearch && matchesDate;
  });

  // Calculate Analytics Stats
  const totalItems = notes.length;
  const completedTasks = notes.filter((n) => n.completed).length;
  const activeTasks = totalItems - completedTasks;
  const completionPercentage = totalItems > 0 ? Math.round((completedTasks / totalItems) * 100) : 0;

  // Category counts
  const categoryStats = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = notes.filter((n) => n.category === cat).length;
    return acc;
  }, {});

  // Calendar calculations
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay(); // 0 is Sunday
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayIndex = getFirstDayOfMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Check if a day has notes
  const getNotesForDay = (dayNum) => {
    return notes.filter((note) => {
      const noteDate = new Date(note.createdAt);
      return (
        noteDate.getFullYear() === currentDate.getFullYear() &&
        noteDate.getMonth() === currentDate.getMonth() &&
        noteDate.getDate() === dayNum
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Decorative blurred background lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-650/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 z-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Workspace Dashboard
            </h1>
            <p className="mt-1 text-slate-400 text-sm">
              Track tasks, review analytics, and manage notes in one unified workspace.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg font-medium transition-all hover:scale-105 duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add New Note / Task
          </button>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Total items */}
          <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Notes & Tasks</p>
              <h3 className="text-3xl font-bold text-white mt-1">{totalItems}</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>

          {/* Card 2: Completed */}
          <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Completed Tasks</p>
              <h3 className="text-3xl font-bold text-emerald-400 mt-1">{completedTasks}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Card 3: Active */}
          <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Items</p>
              <h3 className="text-3xl font-bold text-amber-400 mt-1">{activeTasks}</h3>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Card 4: Progress Bar */}
          <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Task Completion Rate</p>
              <span className="text-sm font-bold text-indigo-400">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                style={{ width: `${completionPercentage}%` }}
                className="bg-gradient-to-r from-indigo-550 to-emerald-500 h-full rounded-full transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>

        {/* Dashboard Main layout: Left is Filters/Notes, Right is Calendar & Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left / Middle: Notes Feed */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search & Categories Filter */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-slate-900/40 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
              {/* Search input */}
              <div className="relative flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search workspace..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl outline-none text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                />
              </div>

              {/* Category selector */}
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === "All"
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                      : "bg-slate-950/60 text-slate-450 border border-slate-800 hover:text-slate-200"
                  }`}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                        : "bg-slate-950/60 text-slate-450 border border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Date filter warning indicator */}
            {selectedDateFilter && (
              <div className="flex justify-between items-center px-4 py-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-350 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Showing notes for: <strong className="text-white">{selectedDateFilter.toLocaleDateString(undefined, { dateStyle: "long" })}</strong>
                </div>
                <button
                  onClick={() => setSelectedDateFilter(null)}
                  className="px-2 py-0.5 bg-indigo-500/25 hover:bg-indigo-500/40 text-white rounded transition-all font-semibold"
                >
                  Clear Filter
                </button>
              </div>
            )}

            {/* Notes Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-400 text-sm">Loading workspace notes...</p>
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/10 border border-dashed border-slate-800 rounded-2xl p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto text-slate-650 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="text-base font-semibold text-slate-200">No notes found</h3>
                <p className="mt-1 text-slate-500 text-xs">
                  Create a new note or change your filters to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNotes.map((note) => (
                  <div
                    key={note._id}
                    style={{ borderColor: note.completed ? "#10B98140" : `${note.color}40` }}
                    className={`bg-slate-900/30 backdrop-blur-md rounded-2xl border p-5 flex flex-col justify-between hover:scale-[1.01] hover:shadow-lg transition-all duration-300 group relative overflow-hidden ${
                      note.completed ? "opacity-60 bg-emerald-950/5" : ""
                    }`}
                  >
                    {/* Visual accent bar at the top */}
                    <div
                      style={{ backgroundColor: note.completed ? "#10B981" : note.color }}
                      className="absolute top-0 left-0 right-0 h-1.5 opacity-80"
                    ></div>

                    <div>
                      {/* Checkbox for task tracking & category badge */}
                      <div className="flex justify-between items-center mb-3 mt-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleTaskCompletion(note)}
                            className="p-1 rounded-full text-slate-400 hover:bg-slate-800 transition-colors"
                            title={note.completed ? "Mark Incomplete" : "Mark Completed"}
                          >
                            {note.completed ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-slate-500 hover:border-indigo-400 transition-colors"></div>
                            )}
                          </button>

                          <span
                            style={{
                              backgroundColor: note.completed ? "#10B98115" : `${note.color}15`,
                              color: note.completed ? "#10B981" : note.color,
                            }}
                            className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                          >
                            {note.category}
                          </span>
                        </div>

                        {note.completed && (
                          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Completed
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h3 className={`text-base font-bold text-white mb-2 line-clamp-1 ${note.completed ? "line-through text-slate-400" : ""}`}>
                        {note.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed mb-4 whitespace-pre-wrap line-clamp-3">
                        {note.description}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="flex justify-between items-center border-t border-slate-800/60 pt-3 mt-auto">
                      <span className="text-[10px] text-slate-500">
                        {new Date(note.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(note)}
                          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note._id)}
                          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-450 transition-colors"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Calendar Widget & Stats */}
          <div className="space-y-6">
            
            {/* Calendar Widget */}
            <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-350">Calendar</h3>
                <div className="flex items-center gap-2">
                  <button onClick={prevMonth} className="p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {currentDate.toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                  </span>
                  <button onClick={nextMonth} className="p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Day Labels */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-500 uppercase mb-2">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for padding */}
                {Array(firstDayIndex)
                  .fill(0)
                  .map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square"></div>
                  ))}

                {/* Day Numbers */}
                {Array(daysInMonth)
                  .fill(0)
                  .map((_, i) => {
                    const dayNum = i + 1;
                    const dayNotes = getNotesForDay(dayNum);
                    const hasNotes = dayNotes.length > 0;
                    const isSelected =
                      selectedDateFilter &&
                      selectedDateFilter.getFullYear() === currentDate.getFullYear() &&
                      selectedDateFilter.getMonth() === currentDate.getMonth() &&
                      selectedDateFilter.getDate() === dayNum;

                    return (
                      <button
                        key={dayNum}
                        onClick={() =>
                          setSelectedDateFilter(
                            new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNum)
                          )
                        }
                        className={`aspect-square text-[11px] font-medium rounded-lg flex flex-col justify-center items-center transition-all ${
                          isSelected
                            ? "bg-indigo-500 text-white font-bold scale-105"
                            : hasNotes
                            ? "bg-slate-800 text-indigo-300 hover:bg-slate-700"
                            : "text-slate-400 hover:bg-slate-800/50"
                        }`}
                      >
                        {dayNum}
                        {hasNotes && !isSelected && (
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-0.5"
                            style={{ backgroundColor: dayNotes[0].color || "#4F46E5" }}
                          ></span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Category Breakdown Widget */}
            <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-350 mb-4">Category Distribution</h3>
              <div className="space-y-3">
                {CATEGORIES.map((cat) => {
                  const count = categoryStats[cat] || 0;
                  const percent = totalItems > 0 ? Math.round((count / totalItems) * 100) : 0;
                  const accentColor = cat === "Todo" ? "#10B981" : cat === "Work" ? "#06B6D4" : cat === "Personal" ? "#F59E0B" : cat === "Ideas" ? "#EC4899" : "#8B5CF6";
                  
                  return (
                    <div key={cat}>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-semibold text-slate-300">{cat}</span>
                        <span className="text-slate-500 font-bold">{count} ({percent}%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${percent}%`, backgroundColor: accentColor }}
                          className="h-full rounded-full transition-all duration-500"
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Modal - Add / Edit Note */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative">
            
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Title */}
            <h2 className="text-lg font-bold text-white mb-6">
              {modalMode === "create" ? "Create New Note / Task" : "Edit Note / Task"}
            </h2>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Task title..."
                  value={noteForm.title}
                  onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl outline-none text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                />
              </div>

              {/* Category and Accent select */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={noteForm.category}
                    onChange={(e) => setNoteForm({ ...noteForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl outline-none text-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Accent Color
                  </label>
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {PRESET_COLORS.map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setNoteForm({ ...noteForm, color: col })}
                        style={{ backgroundColor: col }}
                        className={`w-6 h-6 rounded-full transition-all ${
                          noteForm.color === col ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110" : "hover:scale-105"
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Task details..."
                  value={noteForm.description}
                  onChange={(e) => setNoteForm({ ...noteForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl outline-none text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none"
                ></textarea>
              </div>

              {/* Completion checkbox in Edit Mode */}
              {modalMode === "edit" && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="modal-completed"
                    checked={noteForm.completed}
                    onChange={(e) => setNoteForm({ ...noteForm, completed: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-650 bg-slate-950 border-slate-800"
                  />
                  <label htmlFor="modal-completed" className="text-xs font-semibold text-slate-300 cursor-pointer">
                    Mark as Completed
                  </label>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all text-sm shadow-md"
                >
                  {modalMode === "create" ? "Save Note / Task" : "Update Note / Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
