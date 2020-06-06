Typesetter

abstract class

# Properties

`mathStyle : MathStyle`

`pxpfu: number`

# Methods
setSpec Bare Min: {mathStyle, upm}
`constructor(setSpec);`


`*calculatePXPFU()`

`generateMetrics()`  
should be overridden every typesetting type should have a defined way to return a Metric must call the follwing functions

`*calculateHeight()`
`*calculateDepth()`
`*calculateWidth()`