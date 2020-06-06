Node

Abstract Class

# Properties

`spacingStyle : 2 ENUMs`
- Determines interelement spacing within the line includes defacto and dejure spacing styles initially they should be the same

`mathStyle : STRUCT`
- determines font size and certain spacing features

`componentStyle : STRUCT`
- determines the CSS properties of the Node's Component

`component : React Component`

`parent: Node`

# Methods

`get spacingStyle`

`set mathStyle`

`get componentStyle`  
`set componentStyle`
- set with a function that takes the current component style as a parameter should be impossible to change h,w

`get metric `