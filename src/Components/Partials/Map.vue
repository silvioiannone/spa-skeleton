<template>
    <div style="width: 100%; height: 450px"/>
</template>

<script>

    import Config     from '../../Config';
    import GoogleMaps from 'google-maps';

    let map = null;
    let google = null;

    export
    {
        selector: 'partial-map',

        props: {

            /**
             * Holds the coordinates.
             */
            coordinates: {
                type: Object
            }
        },

        mounted()
        {
            if(this.coordinates)
            {
                this.updateCoordinates();
            }
        },

        methods:
        {
            /**
             * Initialize the map.
             */
            initMap()
            {
                let self = this;

                return new Promise((resolve, reject) =>
                {
                    GoogleMaps.KEY = Config.maps.apiKey;

                    GoogleMaps.load(googleObj =>
                    {
                        google = googleObj;

                        // Try to initialize the map every 100 ms
                        // This is needed because the Google map won't display
                        // if the component is hidden.
                        let interval = setInterval(() =>
                        {
                            // If the component is hidden there's no point in
                            // trying to initialize the map.
                            if(self.$el.offsetParent === null) return;

                            map = new google.maps.Map(self.$el, {
                                scrollwheel: false
                            });
                            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                            map.setZoom(17);

                            // Hack: refresh the map every 500 ms to apply any
                            // change to the parameters or the component status.
                            setInterval(() =>
                            {
                                google.maps.event.trigger(map, 'resize');
                            }, 500);

                            // The component is visible, remove the interval
                            clearInterval(interval);
                            resolve();
                        }, 100);
                    });
                });
            },

            /**
             * Update the map coordinates.
             */
            updateCoordinates()
            {
                this.initMap()
                    .then(() =>
                    {
                        if(!this.coordinates.latitude || !this.coordinates.longitude) return;

                        let coordinatesLiteral = {
                            lat: this.coordinates.latitude,
                            lng: this.coordinates.longitude
                        };

                        let marker = new google.maps.Marker({
                            position: coordinatesLiteral
                        });

                        // Center on the marker
                        map.setCenter(coordinatesLiteral);

                        // Put the marker on the map
                        marker.setMap(map);
                    });
            }
        },

        watch:
        {
            'coordinates'()
            {
                this.updateCoordinates();
            }
        }
    }
</script>
