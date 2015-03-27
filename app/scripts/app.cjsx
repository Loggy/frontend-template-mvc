React = require 'react'
Tip = require './tip'
MapView = require './map'
Address = require './address'

App = React.createClass
	displayName: 'App'

	propTypes:
		text: React.PropTypes.string.isRequired

	getDefaultProps: ->
		text: 'Hello, world'

	getInitialState: ->
		value: 'Привет!'

	render: ->
		<div className="app">
			<Tip />
			<MapView />
			<p>{ @state.value }</p>
			<input type="text" onChange={ @handleChange } />
		</div>

	handleChange: (e) ->
		value = e.target.value
		@setState(value: value)

module.exports = App