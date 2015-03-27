React = require 'react'
ReactGoogleMaps = require 'react-googlemaps'
GoogleMapsAPI = window.google.maps

google.maps.Circle.prototype.contains = (latLng) ->
  this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius()

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
		addressesArr = Object.keys(addressesObj).map((key) -> addressesObj[key] )
		addressesArr.map((el) -> el.LatLng = new GoogleMapsAPI.LatLng(el.lat, el.lon) )
		{
			addressesArr: addressesArr
			circleCenter: new GoogleMapsAPI.LatLng(55.75167,37.61778)
			currentAddress: ''
		}

	handleClick: (e) ->
		@setState(circleCenter: new GoogleMapsAPI.LatLng(e.latLng.k,e.latLng.D))

	setAddress: (e, c)->
		console.log c.title
		window.currentAddress = c.titel
		@setState(currentAddress: c.title)

	render: ()->
		addresses = @state.addressesArr.map (addr)->
			<p>
				<span> {addr.address} </span>
				<br />
				<span> {addr.LatLng} </span>
			</p>

		markers = @state.addressesArr.map (addr) =>
			<Marker
				title = {addr.address}
				onClick = {@setAddress}
				position = {addr.LatLng} />


		<div
			refs="map" >
			<Map
				className="map"
				onClick={@handleClick}
				initialZoom={11}
				initialCenter={new GoogleMapsAPI.LatLng(55.75167,37.61778)}>

				<Marker
					position={@state.circleCenter} />
				{markers}
				<Circle
					strokeColor="#2980b9"
					fillColor="#2980b9"
					fillOpacity=.35
					center={@state.circleCenter}
					radius={5000} />
			</Map>
			<div>
				{@state.currentAddress}
			</div>
		</div>

module.exports = MapView