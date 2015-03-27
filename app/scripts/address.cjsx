React = require 'react'

Address = React.createClass
	displayName: 'Address'

	render: ->
		<div className="address">
			<span className="address__icon"></span>
			<span className="address__name"></span>
			<span className="address__distance"></span>
		</div>


module.exports = Address