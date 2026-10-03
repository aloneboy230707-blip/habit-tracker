import HabitCard from "../components/HabitCard";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import React from "react";

import AddHabit from "../components/AddHabit";
import SearchBar from "../components/SearchBar";

function HabitsPage({

  habit,
  setHabit,

  category,
  setCategory,

  difficulty,
  setDifficulty,

  habitReminderTime,
  setHabitReminderTime,

  addHabit,

  search,
  setSearch,

  filter,
  setFilter,

  sortBy,
  setSortBy,

  habits,
  filteredHabits,

  editingId,
  editedText,

  setEditedText,
  setEditingId,

  completeHabit,
  editHabit,
  deleteHabit,
  updateNotes,

  handleDragEnd,

  setSelectedHabit,

}) {

  return (
    <>
      <AddHabit
        habit={habit}
        setHabit={setHabit}
        addHabit={() =>
          addHabit(
            habit,
            category,
            difficulty,
            habitReminderTime
          )
        }
        category={category}
        setCategory={setCategory}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        reminderTime={habitReminderTime}
        setReminderTime={setHabitReminderTime}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />
      <div className="toolbar">

    {/* Search */}
    <div className="toolbar-search">
    </div>

    {/* Category Filter */}
    <div className="toolbar-filter">

      <button
        className={filter === "All" ? "active" : ""}
        onClick={() => setFilter("All")}
      >
        All
      </button>

      <button
        className={filter === "Fitness" ? "active" : ""}
        onClick={() => setFilter("Fitness")}
      >
        Fitness
      </button>

      <button
        className={filter === "Study" ? "active" : ""}
        onClick={() => setFilter("Study")}
      >
        Study
      </button>

      <button
        className={filter === "Health" ? "active" : ""}
        onClick={() => setFilter("Health")}
      >
        Health
      </button>

      <button
        className={filter === "Reading" ? "active" : ""}
        onClick={() => setFilter("Reading")}
      >
        Reading
      </button>

    </div>

    {/* Sort */}
    <div className="toolbar-sort">

      <select
  value={sortBy}
  onChange={(e) =>
    setSortBy(e.target.value)
  }
>

  <option value="custom">
    Custom Order
  </option>

  <option value="newest">
    Newest
  </option>

        <option value="oldest">
          Oldest
        </option>

        <option value="highestStreak">
          Highest Streak
        </option>

        <option value="lowestStreak">
          Lowest Streak
        </option>

        <option value="mostCompleted">
          Most Completed
        </option>

        <option value="alphabetical">
          A-Z
        </option>

      </select>

    </div>

  </div>
   <DragDropContext
  onDragEnd={handleDragEnd}
>

  <Droppable
    droppableId="habits"
  >

    {(provided) => (

      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
      >

        {filteredHabits.map(
          (item, index) => (

            <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}
            >

              {(provided) => (

                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >

                 <div
  onClick={() =>
    setSelectedHabit(item)
  }
>

  <HabitCard
    item={item}
    editingId={editingId}
    editedText={editedText}
    setEditedText={setEditedText}
    setEditingId={setEditingId}
    completeHabit={completeHabit}
    editHabit={(id) =>
      editHabit(
        id,
        editedText,
        setEditingId,
        setEditedText
      )
    }
    deleteHabit={deleteHabit}
    updateNotes={updateNotes}
  />

</div>

                </div>

              )}

            </Draggable>

          )
        )}

        {provided.placeholder}

      </div>

    )}

  </Droppable>

</DragDropContext>
    </>
  );
}

export default HabitsPage;