React = require 'react'
Tip = require './tip'
MapView = require './map'

App = React.createClass
	displayName: 'App'

	render: ->
		<div className="app">
			<Tip />
			<MapView />
		</div>

module.exports = App