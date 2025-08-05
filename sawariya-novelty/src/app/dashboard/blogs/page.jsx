"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import axios from "axios";
// Sample tasks
const initialTasks = [
  { id: "1", title: "Task A", status: "pending" },
  { id: "2", title: "Task B", status: "inprogress" },
  { id: "3", title: "Task C", status: "complete" },
];

const columns = {
  pending: "Pending",
  inprogress: "In Progress",
  complete: "Complete",
};

// Draggable task card
function DraggableCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white p-2 rounded shadow mb-2"
    >
      {task.title}
    </div>
  );
}

// Droppable column
function DroppableColumn({ status, tasks, onDrop }) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 p-4 rounded min-h-[300px] w-full"
    >
      <h2 className="font-bold text-lg mb-2">{columns[status]}</h2>
      {tasks.map((task) => (
        <DraggableCard key={task.id} task={task} />
      ))}
    </div>
  );
}

// Main board component
export default function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (!over) return;

    const draggedTaskId = active.id;
    const newStatus = over.id;
    console.log(tasks)
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTaskId ? { ...task, status: newStatus } : task
      )
    );
  };
  const makere = async()=>{
    console.log(tasks,"obj")
    await axios.post('/api/tamp',tasks)
  }
  useEffect(()=>{
    
    makere()
  },[tasks])
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
        {Object.keys(columns).map((status) => (
          <DroppableColumn
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}
      </div>
    </DndContext>
  );
}
