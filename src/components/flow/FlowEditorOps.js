import {isEdge, isNode} from "react-flow-renderer";
import {request} from "../../remote_api/uql_api_endpoint";

export function prepareGraph(reactFlowInstance) {
    const flow = reactFlowInstance.toObject();
    let graph = {
        nodes: [],
        edges: []
    }

    flow.elements.map((element) => {
        if (isNode(element)) {
            return graph.nodes.push(element)
        } else {
            return graph.edges.push(element)
        }
    });
    return graph;
}

export function prepareFlowPayload(id, flowMetaData, reactFlowInstance) {
    return {
        id: id,
        name: flowMetaData.name,
        description: flowMetaData.description,
        enabled: flowMetaData.enabled,
        flowGraph: prepareGraph(reactFlowInstance),
        projects: flowMetaData.projects
    }
}

export function save(id, flowMetaData, reactFlowInstance, onError, onReady, progress, deploy = false) {
    const payload = prepareFlowPayload(id, flowMetaData, reactFlowInstance)
    progress(true);
    request(
        {
            url: (deploy === false) ? "/flow/draft" : "/flow",
            method: "POST",
            data: payload
        },
        progress,
        (e) => {
            if (e) {
                onError({message: e[0].msg, type: "error", hideAfter: 2000});
            }
        },
        (data) => {
            if (data) {
                onReady(data);
            }
        }
    )
}

export function debug(id, reactFlowInstance, onError, progress, onReady) {
    progress(true);
    request(
        {
            url: "/flow/debug",
            method: "POST",
            data: {
                id: id,
                name: "Name is not set in debug mode",
                description: "Description is not set in debug mode",
                enabled: true,
                flowGraph: prepareGraph(reactFlowInstance),
                projects: []
            }
        },
        progress,
        (e) => {
            if (e) {
                onError({message: e[0].msg, type: "error", hideAfter: 5000});
            }
        },
        (data) => {
            if (data) {
                const flow = reactFlowInstance.toObject();

                flow.elements.map((element) => {

                    element.data = {...element.data,
                        debugging: {
                            node: {},
                            edge: {}
                        }
                    }

                    if (isNode(element)) {
                        if (data?.data?.debugInfo?.nodes[element.id]) {
                            element.data.debugging = {
                                ...element.data.debugging,
                                node: data.data.debugInfo.nodes[element.id]
                            }
                        } else {
                            delete element.data.debugging
                        }
                    }

                    if (isEdge(element)) {
                        if(data?.data?.debugInfo?.edges) {
                            const edge_info = data.data?.debugInfo?.edges[element.id]
                            if (edge_info) {
                                element.data.debugging = {
                                    ...element.data.debugging,
                                    edge: edge_info
                                }
                                if(edge_info.active.includes(false) && !edge_info.active.includes(true)) {
                                    element.label = "Inactive";
                                    element.labelStyle = {
                                        fontSize: 14
                                    }
                                    element.animated = false;
                                    element.style = {
                                        stroke: '#aaa'
                                    }
                                } else if (edge_info.active.includes(true) && !edge_info.active.includes(false)) {
                                    element.label = null
                                    // element.label = edge_info.active.toString();
                                    element.animated = true
                                    element.style = {};
                                } else {
                                    element.label = null
                                    // element.label = edge_info.active.toString();
                                    element.animated = true
                                    element.style = {
                                        stroke: '#aaa'
                                    }
                                }
                            } else {
                                // no debug info
                                element.label = null
                                element.animated = false
                                element.style = {
                                    stroke: '#ddd',
                                    strokeWidth: 1
                                };
                                element.labelStyle = {
                                    fontSize: 14
                                }
                                element.label = "?"
                            }
                        }
                        else {
                            console.error("DebugInfo.edges missing in server response.")
                        }
                    }

                    return element;
                });
                onReady({
                    elements: flow.elements || [],
                    logs: data?.data?.logs
                });
            }
        }
    )
}