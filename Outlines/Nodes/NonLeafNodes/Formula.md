Formula

Class | extends Non Leaf Node

# Properties

`elements: Node[]`  
List of descendants from left to right


`formulaSetter : FormulaSetter`

# Methods

`constructor(formulaSetter)`  
set and setter


## Related to changing elements  
All of the following methods should trigger update

`insert(index, node)`  
inserts a node after the given index

`splice(startIndex,deleteCount, node1,node2,...)  `
deletes deleteCount Nodes from elements and inserts the given nodes in place

`push(node)`  
pushes a given node to the end of elements

`unshift(node)`  
prepends a node to the list of elements
