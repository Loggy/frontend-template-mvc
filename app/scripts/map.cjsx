React = require 'react'
ReactGoogleMaps = require 'react-googlemaps'
GoogleMapsAPI = window.google.maps

Map = ReactGoogleMaps.Map
Marker = ReactGoogleMaps.Marker
OverlayView = ReactGoogleMaps.OverlayView
Circle = ReactGoogleMaps.Circle



MapView = React.createClass
	displayName: 'MapView'

	getInitialState: ->
		r = new XMLHttpRequest()
		r.open("GET", "scripts/postorgs.json", false)
		r.send(null)
		addressesObj = JSON.parse(r.responseText)
		{
		addressesArr: Object.keys(addressesObj).map((key) -> addressesObj[key] )
		circleCenter: new GoogleMapsAPI.LatLng(55.75167,37.61778)
		}

	handleClick: (e) ->
		@setState(circleCenter: new GoogleMapsAPI.LatLng(e.latLng.k,e.latLng.D))


	render: ()->
		addresses = @state.addressesArr.map((addr)->
			<p>
				<span> {addr.address} </span>
				<br />
				<span> {addr.lon} </span>
				<br />
				<span> {addr.lat} </span>
			</p>
		)
		<div>
			<Map
				className="map"
				onClick={@handleClick}
				initialZoom={11}
				initialCenter={new GoogleMapsAPI.LatLng(55.75167,37.61778)}>

				<Marker
					position={@state.circleCenter} />
				<Circle
					strokeColor="#2980b9"
					fillColor="#2980b9"
					fillOpacity=.35
					center={@state.circleCenter}
					radius={5000} />
			</Map>
			{addresses}
		</div>

module.exports = MapView