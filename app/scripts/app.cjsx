React = require 'react'
Tip = require './tip'
MapView = require './map'

App = React.createClass
	displayName: 'App'

	getInitialState: ->
		value: 'Привет!'

	render: ->
		<div className="app">
			<Tip />
			<MapView />
		</div>

module.exports = App