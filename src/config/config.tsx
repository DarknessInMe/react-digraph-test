import { DragDataType } from "../AppTypes";

export const GraphConfig = {
	NodeTypes: {
		empty: {
			typeText: "None",
			shapeId: "#empty", // relates to the type property of a node
			shape: (
				<symbol viewBox='0 0 100 100' id='empty' key='0'>
					<circle cx='50' cy='50' r='45'></circle>
				</symbol>
			),
		},
	},
	NodeSubtypes: {},
	EdgeTypes: {
		emptyEdge: {
			shapeId: "#emptyEdge",
			shape: (
				<symbol viewBox='0 0 50 50' id='emptyEdge' key='0'>
					<circle cx='25' cy='25' r='8' fill='currentColor'>
						{" "}
					</circle>
				</symbol>
			),
		},
	},
};

export const NODE_KEY: "id" = "id"; // Allows D3 to correctly update DOM

export const dragData: DragDataType[] = [
	{
		content: {
			title: "FIRST POINT",
			description: "Hello world....",
		},
		value: 1,
	},
	{
		content: {
			title: "SECOND POINT",
			description: "I am point b ....",
		},
		value: 2,
	},
	{
		content: {
			title: "THIRD POINT",
			description: "I am point c ...",
		},
		value: 3,
	},
];
