React = require 'react'

Address = React.createClass
	displayName: 'Address'

	render: ->
		<div
		className="address__cell">
			<div className="icon-house address__cell__icon"></div>
			<div className="address__cell__data">
				<span>Адрес: {@props.address}</span>
				<br />
				<span>{@props.distance} метров</span>
			</div>
		</div>


module.exports = Address