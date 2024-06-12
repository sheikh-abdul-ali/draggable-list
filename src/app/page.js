import Head from "next/head";
import DraggableList from "./components/DraggableList.jsx";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Draggable List</title>
				<meta
					name="description"
					content="Draggable list using DnD Kit and Next.js"
				/>
			</Head>
			<main className="flex justify-center items-center min-h-screen bg-gray-100">
				<DraggableList />
			</main>
		</div>
	);
}
