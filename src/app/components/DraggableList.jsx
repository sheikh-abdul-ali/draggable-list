"use client";

import {
	closestCenter,
	DndContext,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Image from "next/image";
import { useState } from "react";

import image1 from "../../../public/images/image1.png";
import image2 from "../../../public/images/image2.png";
import image3 from "../../../public/images/image3.png";
import image4 from "../../../public/images/image4.png";
import image5 from "../../../public/images/image5.png";
import image6 from "../../../public/images/image6.png";
import pin from "../../../public/images/pin.svg";

const items = [
	{
		id: 1,
		title: "Scotland Island",
		location: "Sydney, Australia",
		image: image1,
	},
	{
		id: 2,
		title: "The Charles Grand Brasserie & Bar",
		location: "Lorem ipsum, Dolor",
		image: image2,
	},
	{ id: 3, title: "Bridge Climb", location: "Dolor, Sit amet", image: image3 },
	{
		id: 4,
		title: "Scotland Island",
		location: "Sydney, Australia",
		image: image4,
	},
	{
		id: 5,
		title: "Clam Bar",
		location: "Etcetera veni, Vidi vici",
		image: image5,
	},
	{
		id: 6,
		title: "Vivid Festival",
		location: "Sydney, Australia",
		image: image6,
	},
];

const SortableItem = ({
	id,
	title,
	location,
	image,
	isDragging,
	isOverlay,
}) => {
	const { attributes, listeners, setNodeRef, transform, transition, isOver } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform?.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		backgroundColor: "#fff",
		borderBottom: isOver ? "3px solid #1E9BF0" : "none",
		zIndex: isOverlay ? 50 : "auto",
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="flex items-center p-4 border-b border-gray-200"
		>
			<div className="w-16 h-16 rounded-md mr-4 relative">
				<Image
					src={image}
					alt={title}
					layout="fill"
					objectFit="cover"
					className="rounded-md"
				/>
			</div>{" "}
			<div>
				<h3 className="font-semibold text-base text-[#292B36]">{title}</h3>
				{!isDragging && !isOverlay && (
					<div className="flex gap-1 items-center">
						<Image src={pin} alt="location" width={16} height={16} />
						<p className="text-gray-500">{location}</p>
					</div>
				)}
			</div>
		</div>
	);
};

const DraggableList = () => {
	const [list, setList] = useState(items);
	const [activeId, setActiveId] = useState(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		})
	);

	const handleDragStart = (event) => {
		setActiveId(event.active.id);
	};

	const handleDragEnd = (event) => {
		const { active, over } = event;
		setActiveId(null);

		if (active.id !== over.id) {
			setList((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	const getItemById = (id) => list.find((item) => item.id === id);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={list} strategy={verticalListSortingStrategy}>
				<div className="max-w-lg w-[80vw] mx-auto bg-white shadow-md rounded-lg overflow-hidden">
					{list.map((item) => (
						<SortableItem
							key={item.id}
							id={item.id}
							title={item.title}
							location={item.location}
							image={item.image}
							isDragging={activeId === item.id}
						/>
					))}
				</div>
			</SortableContext>
			<DragOverlay>
				{activeId ? (
					<div style={{ width: "70%" }}>
						<div className="flex items-center p-4 border-b border-gray-200 bg-white shadow-lg">
							<div className="w-8 h-8 rounded-md mr-4 relative">
								<Image
									src={getItemById(activeId).image}
									alt={getItemById(activeId).title}
									layout="fill"
									objectFit="cover"
									className="rounded-md"
								/>
							</div>
							<div>
								<h3 className="font-semibold text-base text-[#292B36]">
									{getItemById(activeId).title}
								</h3>
							</div>
						</div>
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

export default DraggableList;
