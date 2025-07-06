// // store.js

// import { create } from "zustand";
// import {
//     addEdge,
//     applyNodeChanges,
//     applyEdgeChanges,
//     MarkerType,
//   } from 'reactflow';

// export const useStore = create((set, get) => ({
//     nodes: [],
//     edges: [],
//     getNodeID: (type) => {
//         const newIDs = {...get().nodeIDs};
//         if (newIDs[type] === undefined) {
//             newIDs[type] = 0;
//         }
//         newIDs[type] += 1;
//         set({nodeIDs: newIDs});
//         return `${type}-${newIDs[type]}`;
//     },
//     addNode: (node) => {
//         set({
//             nodes: [...get().nodes, node]
//         });
//     },
//     onNodesChange: (changes) => {
//       set({
//         nodes: applyNodeChanges(changes, get().nodes),
//       });
//     },
//     onEdgesChange: (changes) => {
//       set({
//         edges: applyEdgeChanges(changes, get().edges),
//       });
//     },
//     onConnect: (connection) => {
//   console.log("Trying to connect:", connection);
//   set({
//     edges: addEdge({
//       ...connection,
//       type: 'smoothstep',
//       animated: true,
//       markerEnd: {
//         type: MarkerType.Arrow,
//         height: '20px',
//         width: '20px'
//       }
//     }, get().edges),
//   });
// },

//     updateNodeField: (nodeId, fieldName, fieldValue) => {
//   set({
//     nodes: get().nodes.map((node) => {
//       if (node.id === nodeId) {
//         return {
//           ...node,
//           data: {
//             ...node.data,
//             [fieldName]: fieldValue,
//             __v: Date.now(), // 👈 trigger re-render by changing reference
//           }
//         };
//       }
//       return node;
//     }),
//   });
// }

//   }));
import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    console.log("Trying to connect:", connection);
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow,
            height: 20,
            width: 20,
          },
        },
        get().edges
      ),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              [fieldName]: fieldValue,
              __v: Date.now(), // 👈 forces re-render
            },
          };
        }
        return node;
      }),
    });
  },
}));
