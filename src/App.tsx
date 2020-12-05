import React, {
	useState,
	useRef,
	//  useEffect
} from "react";
import "./App.css";
import {
	GraphView, // required
	IEdge, // optional
	INode, // optional
} from "react-digraph";
import { GraphConfig, NODE_KEY, dragData } from "./config/config";
import unique from "./utils/unique";
import { DragDataType, StateType } from "./AppTypes";

const initialState: StateType = {
	nodes: [],
	edges: [],
};

const App = () => {
	const [graph, setGraph] = useState<StateType>(initialState);
	const [selectedGraph] = useState({});
	const GraphViewRef = useRef<"GraphView">("GraphView");

	// useEffect(() => {
	// 	const localNodeStore: any[] = [];

	// 	graph.nodes.forEach((_, index) => {
	// 		const nodes = document.querySelector(`#node-${index + 1}-container`);
	// 		localNodeStore.push(nodes);
	// 	});

	// 	console.log(localNodeStore);
	// }, [graph]);

	const nodes: INode[] = graph.nodes;
	const edges: IEdge[] = graph.edges;
	const selected = selectedGraph;

	const NodeTypes = GraphConfig.NodeTypes;
	const NodeSubtypes = GraphConfig.NodeSubtypes;
	const EdgeTypes = GraphConfig.EdgeTypes;

	const dropZoneOnDropHandler = (e: React.DragEvent<HTMLElement>): void => {
		e.preventDefault();

		const cache: DragDataType = JSON.parse(e.dataTransfer.getData("cache"));

		const newKey: string = unique();

		const newNode: INode = {
			id: Number(newKey),
			title: cache.content.title,
			x: e.clientX,
			y: e.clientY,
			type: "empty",
		};

		setGraph((prev) => {
			return {
				...prev,
				nodes: [...prev.nodes, newNode],
			};
		});

		if (graph.nodes.length >= 1) {
			const newEdge: IEdge = {
				source: (Number(newKey) - 1).toString(),
				target: newKey,
				type: "emptyEdge",
			};

			setGraph((prev) => {
				return {
					...prev,
					edges: [...prev.edges, newEdge],
				};
			});
		}
	};

	return (
		<div className='app'>
			<div
				className='app__drop-zone'
				onDragEnter={(e: React.DragEvent<HTMLElement>) => e.preventDefault()}
				onDragOver={(e: React.DragEvent<HTMLElement>) => e.preventDefault()}
				onDrop={dropZoneOnDropHandler}
			>
				<GraphView
					ref={() => GraphViewRef}
					nodeKey={NODE_KEY}
					nodes={nodes}
					edges={edges}
					selected={selected}
					nodeTypes={NodeTypes}
					nodeSubtypes={NodeSubtypes}
					edgeTypes={EdgeTypes}
					renderBackground={() => false}
					onSwapEdge={() => console.log("object")}
				/>
			</div>
			<div className='app__drag-zone'>
				{dragData.map((dragElement, index) => {
					return (
						<div
							key={index}
							className='dragElement'
							draggable={true}
							onDragStart={(e: React.DragEvent<HTMLElement>) => {
								e.dataTransfer.setData(
									"cache",
									JSON.stringify({
										content: dragElement.content,
										value: dragElement.value,
									})
								);
							}}
							onDragEnd={(e: React.DragEvent<HTMLElement>) => {
								e.preventDefault();
								e.dataTransfer.clearData();
							}}
						>
							{dragElement.content.title}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default App;
