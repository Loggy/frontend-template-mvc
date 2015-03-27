React = require 'react'

Tip = React.createClass
	displayName: 'Tip'

	render: ->
		<div className="tip-container">
			<div className="tip-container__tip">
				Кликните на интересующее вас место, чтобы увидеть адреса в радиусе 5км.
			</div>
		</div>


module.exports = Tip