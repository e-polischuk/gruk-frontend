import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'

@Component({
    selector: 'ukraine-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    visibility: boolean = true;
    title: string = 'КАРТА УКРАЇНИ:';
    lat: number;
    lng: number;
    zoom: number;
    public searchControl: FormControl;
    
    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) { }

    ngOnInit() {
        //set google maps defaults
        this.lat = 48.35;
        this.lng = 31.15;
        this.zoom = 4;

        //create search FormControl
        this.searchControl = new FormControl();

        //set current position
        this.setCurrentPosition();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["geocode"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

    toggle() {
        this.visibility = !this.visibility;
    }
}
