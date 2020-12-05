import { IEdge, INode } from "react-digraph";

export type StateType = {
	nodes: INode[];
	edges: IEdge[];
};

export type ContentType = {
	title: string;
	description: string;
};

export type DragDataType = {
	content: ContentType;
	value: number;
};
