React = require 'react'
ReactGoogleMaps = require 'react-googlemaps'
GoogleMapsAPI = window.google.maps

google.maps.Circle.prototype.contains = (latLng) ->
  @getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= @getRadius()

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
			currentAddress: 'Центр Москвы'
			currentLatLng: new GoogleMapsAPI.LatLng(55.75167,37.61778)
			markersToShow: []
		}

	getDefaultProps: ->
			radius: 5000

	handleClick: (e) ->
		@setState(circleCenter: new GoogleMapsAPI.LatLng(e.latLng.k,e.latLng.D))
		@setState(currentLatLng: null)
		@setState(currentAddress: '')
		@showMarkers(@state.circleCenter, @props.radius)

	showMarkers: (center,radius) ->
		@setState(markersToShow: [])
		tempArray = []
		@state.addressesArr.map((el) =>
			distance = google.maps.geometry.spherical.computeDistanceBetween(center, el.LatLng)
			if distance <= radius
				el.distance = Math.ceil(distance)
				tempArray.push(el)
		)
		@setState(markersToShow: tempArray)
	setAddress: (e, c)->
		@setState(currentAddress: c.title)
		@setState(currentLatLng: e.latLng)

	render: ()->
		markers = @state.markersToShow.map (addr) =>
			<Marker
				title = {addr.address}
				onClick = {@setAddress}
				icon="images/marker.svg"
				position = {addr.LatLng} />

		table = @state.markersToShow.map (addr) =>
			<div
			className="address__cell">
				<div className="icon-house address__cell__icon"></div>
				<div className="address__cell__data">
					<span>Адрес: {addr.address}</span>
					<br />
					<span>{addr.distance} метров</span>
				</div>
			</div>
		<div>
			<Map
			ref="map"
			className="map"
			onClick={@handleClick}
			initialZoom={11}
			initialCenter={new GoogleMapsAPI.LatLng(55.75167,37.61778)}>

				<Marker
				position={@state.circleCenter} />
				{markers}
				<Circle
				ref="circle"
				strokeColor="#2980b9"
				fillColor="#2980b9"
				fillOpacity=.35
				center={@state.circleCenter}
				radius={@props.radius} />
				<OverlayView
				style={{backgroundColor: '#fff', zIndex: 10001}}
				position={@state.currentLatLng}>
					<p>{@state.currentAddress}</p>
				</OverlayView>
			</Map>
			<div
				className='address'>
				{table}
			</div>
		</div>

module.exports = MapView

