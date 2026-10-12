import { BusRoute } from '../types';

/**
 * Official SISTec Gandhinagar Bus Routes & Stops
 * Source: SISTEC GN BUS ROUTE W.E.F 10.08.2026.pdf
 * Traced with accurate OpenStreetMap road network geometry
 */
export const INITIAL_MOCK_ROUTES: BusRoute[] = [
  {
    "id": "route-1",
    "routeNumber": "Route 1",
    "title": "PIPLANI NIZAMUDDIN",
    "origin": "PIPLANI PETROL PUMP",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:10",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#4ECCA3",
    "activeBus": {
      "id": "bus-1",
      "routeId": "route-1",
      "plateNumber": "MP-04-HE-2001",
      "capacity": 52,
      "occupiedSeats": 39,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 36,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.23728,
        "longitude": 77.48698
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-1-1",
      "driver": {
        "id": "drv-1",
        "name": "Pawan",
        "phone": "+91 7880131501",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-101"
      },
      "conductor": {
        "id": "cnd-1",
        "name": "Afzal Alam",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-201"
      }
    },
    "stops": [
      {
        "id": "stop-1-1",
        "name": "PIPLANI PETROL PUMP",
        "sequence": 1,
        "scheduledTime": "8:10",
        "estimatedTime": "8:10",
        "coordinates": {
          "latitude": 23.23728,
          "longitude": 77.48698
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-1-2",
        "name": "NIZAMUDDIN",
        "sequence": 2,
        "scheduledTime": "8:15",
        "estimatedTime": "8:15",
        "coordinates": {
          "latitude": 23.242,
          "longitude": 77.4729
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-1-3",
        "name": "INDRAPURI",
        "sequence": 3,
        "scheduledTime": "8:20",
        "estimatedTime": "8:20",
        "coordinates": {
          "latitude": 23.24512,
          "longitude": 77.47198
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-1-4",
        "name": "TANATAN DHABA",
        "sequence": 4,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.2533,
          "longitude": 77.468
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-1-5",
        "name": "NARELA JOD",
        "sequence": 5,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.258,
          "longitude": 77.4648
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-1-6",
        "name": "SAGAR ENCLAVE",
        "sequence": 6,
        "scheduledTime": "8:37",
        "estimatedTime": "8:37",
        "coordinates": {
          "latitude": 23.2634,
          "longitude": 77.462
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-1-7",
        "name": "AYODHYA NAGAR CHAURAHA",
        "sequence": 7,
        "scheduledTime": "8:38",
        "estimatedTime": "8:38",
        "coordinates": {
          "latitude": 23.26798,
          "longitude": 77.4601
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-1-8",
        "name": "GANESH VILLA",
        "sequence": 8,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.27072,
          "longitude": 77.45832
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-1-9",
        "name": "SAGAR LANDMARK",
        "sequence": 9,
        "scheduledTime": "8:42",
        "estimatedTime": "8:42",
        "coordinates": {
          "latitude": 23.2745,
          "longitude": 77.4552
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-1-10",
        "name": "GREEN VALLEY",
        "sequence": 10,
        "scheduledTime": "8:44",
        "estimatedTime": "8:44",
        "coordinates": {
          "latitude": 23.2798,
          "longitude": 77.4503
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-1-11",
        "name": "SISTec GN",
        "sequence": 11,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.299,
          "longitude": 77.3509
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-2",
    "routeNumber": "Route 2",
    "title": "KAROND",
    "origin": "KAROND SQUARE",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:50",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#38BDF8",
    "activeBus": {
      "id": "bus-2",
      "routeId": "route-2",
      "plateNumber": "MP-04-HE-2002",
      "capacity": 52,
      "occupiedSeats": 40,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 37,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.2995,
        "longitude": 77.39696
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-2-1",
      "driver": {
        "id": "drv-2",
        "name": "David",
        "phone": "+91 7880131502",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-102"
      },
      "conductor": {
        "id": "cnd-2",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-202"
      }
    },
    "stops": [
      {
        "id": "stop-2-1",
        "name": "KAROND SQUARE",
        "sequence": 1,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.2995,
          "longitude": 77.397
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-2-2",
        "name": "NEW JAIL ROAD",
        "sequence": 2,
        "scheduledTime": "8:55",
        "estimatedTime": "8:55",
        "coordinates": {
          "latitude": 23.3068,
          "longitude": 77.382
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-2-3",
        "name": "SISTec GN",
        "sequence": 3,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-4",
    "routeNumber": "Route 4",
    "title": "CTO",
    "origin": "CTO ROAD",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:25",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#F59E0B",
    "activeBus": {
      "id": "bus-4",
      "routeId": "route-4",
      "plateNumber": "MP-04-HE-2004",
      "capacity": 52,
      "occupiedSeats": 42,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 39,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.27801,
        "longitude": 77.34499
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-4-1",
      "driver": {
        "id": "drv-4",
        "name": "Rajesh",
        "phone": "+91 9893151986",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-104"
      },
      "conductor": {
        "id": "cnd-4",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-204"
      }
    },
    "stops": [
      {
        "id": "stop-4-1",
        "name": "CTO ROAD",
        "sequence": 1,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.27801,
          "longitude": 77.34499
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-4-2",
        "name": "DATA COLONY",
        "sequence": 2,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.282,
          "longitude": 77.355
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-4-3",
        "name": "AYYAPA MANDIR",
        "sequence": 3,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.2783,
          "longitude": 77.35011
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-4-4",
        "name": "ADITYA AVENUE",
        "sequence": 4,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.284,
          "longitude": 77.35
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-4-5",
        "name": "SISTec GN",
        "sequence": 5,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-8",
    "routeNumber": "Route 8",
    "title": "KANHASAIYA PATEL NAGAR",
    "origin": "KANHASAIYAN",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:05",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#A78BFA",
    "activeBus": {
      "id": "bus-8",
      "routeId": "route-8",
      "plateNumber": "MP-04-HE-2008",
      "capacity": 52,
      "occupiedSeats": 46,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 43,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.25099,
        "longitude": 77.51006
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-8-1",
      "driver": {
        "id": "drv-8",
        "name": "Om Prakash",
        "phone": "+91 7987255419",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-108"
      },
      "conductor": {
        "id": "cnd-8",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-208"
      }
    },
    "stops": [
      {
        "id": "stop-8-1",
        "name": "KANHASAIYAN",
        "sequence": 1,
        "scheduledTime": "8:05",
        "estimatedTime": "8:05",
        "coordinates": {
          "latitude": 23.25099,
          "longitude": 77.51006
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-8-2",
        "name": "KOKTA TRANSPORT NAGAR",
        "sequence": 2,
        "scheduledTime": "8:10",
        "estimatedTime": "8:10",
        "coordinates": {
          "latitude": 23.25804,
          "longitude": 77.49792
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-8-3",
        "name": "PATEL NAGAR",
        "sequence": 3,
        "scheduledTime": "8:20",
        "estimatedTime": "8:20",
        "coordinates": {
          "latitude": 23.25,
          "longitude": 77.488
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-8-4",
        "name": "ANAND NAGAR",
        "sequence": 4,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.2528,
          "longitude": 77.4917
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-8-5",
        "name": "RATNAGIRI SABJI MANDI",
        "sequence": 5,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.25505,
          "longitude": 77.48494
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-8-6",
        "name": "C G COLONY",
        "sequence": 6,
        "scheduledTime": "8:32",
        "estimatedTime": "8:32",
        "coordinates": {
          "latitude": 23.259,
          "longitude": 77.48
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-8-7",
        "name": "VRIDHAVAN NAGAR",
        "sequence": 7,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.26289,
          "longitude": 77.47509
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-8-8",
        "name": "AYODHYA EXTENSION",
        "sequence": 8,
        "scheduledTime": "8:38",
        "estimatedTime": "8:38",
        "coordinates": {
          "latitude": 23.269,
          "longitude": 77.4651
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-8-9",
        "name": "SISTec GN",
        "sequence": 9,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-9",
    "routeNumber": "Route 9",
    "title": "AHMEDPUR CHARNAL",
    "origin": "CHARNAL",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "7:30",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#F43F5E",
    "activeBus": {
      "id": "bus-9",
      "routeId": "route-9",
      "plateNumber": "MP-04-HE-2009",
      "capacity": 52,
      "occupiedSeats": 47,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 44,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.39708,
        "longitude": 77.09716
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-9-1",
      "driver": {
        "id": "drv-9",
        "name": "Rajesh",
        "phone": "+91 7880131509",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-109"
      },
      "conductor": {
        "id": "cnd-9",
        "name": "Afzal Alam",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-209"
      }
    },
    "stops": [
      {
        "id": "stop-9-1",
        "name": "CHARNAL",
        "sequence": 1,
        "scheduledTime": "7:30",
        "estimatedTime": "7:30",
        "coordinates": {
          "latitude": 23.39708,
          "longitude": 77.09716
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-9-2",
        "name": "AHMEDPUR",
        "sequence": 2,
        "scheduledTime": "7:45",
        "estimatedTime": "7:45",
        "coordinates": {
          "latitude": 23.2975,
          "longitude": 77.3537
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-9-3",
        "name": "KHAIKHEDA",
        "sequence": 3,
        "scheduledTime": "8:00",
        "estimatedTime": "8:00",
        "coordinates": {
          "latitude": 23.29784,
          "longitude": 77.3535
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-9-4",
        "name": "CHOWKI",
        "sequence": 4,
        "scheduledTime": "8:05",
        "estimatedTime": "8:05",
        "coordinates": {
          "latitude": 23.29818,
          "longitude": 77.3533
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-9-5",
        "name": "DORAHA",
        "sequence": 5,
        "scheduledTime": "8:15",
        "estimatedTime": "8:15",
        "coordinates": {
          "latitude": 23.29852,
          "longitude": 77.3531
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-9-6",
        "name": "SHYAMPUR",
        "sequence": 6,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.27416,
          "longitude": 77.0213
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-9-7",
        "name": "JHARKHEDA",
        "sequence": 7,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.2992,
          "longitude": 77.3527
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-9-8",
        "name": "SONKATCH",
        "sequence": 8,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.29932,
          "longitude": 77.35244
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-9-9",
        "name": "MUGALIYA HAAT",
        "sequence": 9,
        "scheduledTime": "8:55",
        "estimatedTime": "8:55",
        "coordinates": {
          "latitude": 23.29923,
          "longitude": 77.35206
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-9-10",
        "name": "PARWALIA",
        "sequence": 10,
        "scheduledTime": "9:00",
        "estimatedTime": "9:00",
        "coordinates": {
          "latitude": 23.29915,
          "longitude": 77.35167
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-9-11",
        "name": "KURANA",
        "sequence": 11,
        "scheduledTime": "9:05",
        "estimatedTime": "9:05",
        "coordinates": {
          "latitude": 23.29908,
          "longitude": 77.35129
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-9-12",
        "name": "SISTec GN",
        "sequence": 12,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-10",
    "routeNumber": "Route 10",
    "title": "KAROND",
    "origin": "ADHAR HOSPITAL",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:40",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#10B981",
    "activeBus": {
      "id": "bus-10",
      "routeId": "route-10",
      "plateNumber": "MP-04-HE-2010",
      "capacity": 52,
      "occupiedSeats": 48,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 45,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.29305,
        "longitude": 77.41002
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-10-1",
      "driver": {
        "id": "drv-10",
        "name": "Sadiq",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-110"
      },
      "conductor": {
        "id": "cnd-10",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-210"
      }
    },
    "stops": [
      {
        "id": "stop-10-1",
        "name": "ADHAR HOSPITAL",
        "sequence": 1,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.29305,
          "longitude": 77.41002
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-10-2",
        "name": "KAROND CHAURAHA",
        "sequence": 2,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.2995,
          "longitude": 77.397
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-10-3",
        "name": "NEW JAIL ROAD",
        "sequence": 3,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.307,
          "longitude": 77.382
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-10-4",
        "name": "SISTec GN",
        "sequence": 4,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-11",
    "routeNumber": "Route 11",
    "title": "CHHOLA ROAD",
    "origin": "CHOPDA",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:05",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#EC4899",
    "activeBus": {
      "id": "bus-11",
      "routeId": "route-11",
      "plateNumber": "MP-04-HE-2011",
      "capacity": 52,
      "occupiedSeats": 49,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 46,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.28095,
        "longitude": 77.41499
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-11-1",
      "driver": {
        "id": "drv-11",
        "name": "Subhash",
        "phone": "+91 9977540136",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-111"
      },
      "conductor": {
        "id": "cnd-11",
        "name": "Afzal Alam",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-211"
      }
    },
    "stops": [
      {
        "id": "stop-11-1",
        "name": "CHOPDA",
        "sequence": 1,
        "scheduledTime": "8:05",
        "estimatedTime": "8:05",
        "coordinates": {
          "latitude": 23.28095,
          "longitude": 77.41499
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-11-2",
        "name": "VIDHATA HOSPITAL",
        "sequence": 2,
        "scheduledTime": "8:12",
        "estimatedTime": "8:12",
        "coordinates": {
          "latitude": 23.281,
          "longitude": 77.4191
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-11-3",
        "name": "CHHOLA DUSHHERA MAIDAN",
        "sequence": 3,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.28274,
          "longitude": 77.42052
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-11-4",
        "name": "SHIV NAGAR",
        "sequence": 4,
        "scheduledTime": "8:27",
        "estimatedTime": "8:27",
        "coordinates": {
          "latitude": 23.28486,
          "longitude": 77.42221
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-11-5",
        "name": "BHANPUR UNDER BRIDGE",
        "sequence": 5,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.29092,
          "longitude": 77.41996
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-11-6",
        "name": "PEOPLES HOSPITAL",
        "sequence": 6,
        "scheduledTime": "8:32",
        "estimatedTime": "8:32",
        "coordinates": {
          "latitude": 23.28997,
          "longitude": 77.42631
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-11-7",
        "name": "PEOPLES MALL",
        "sequence": 7,
        "scheduledTime": "8:34",
        "estimatedTime": "8:34",
        "coordinates": {
          "latitude": 23.29204,
          "longitude": 77.42792
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-11-8",
        "name": "BMHRC",
        "sequence": 8,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.2954,
          "longitude": 77.4302
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-11-9",
        "name": "KALYAN HOSPITAL",
        "sequence": 9,
        "scheduledTime": "8:37",
        "estimatedTime": "8:37",
        "coordinates": {
          "latitude": 23.2925,
          "longitude": 77.415
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-11-10",
        "name": "AADHAR HOSPITAL",
        "sequence": 10,
        "scheduledTime": "8:38",
        "estimatedTime": "8:38",
        "coordinates": {
          "latitude": 23.29324,
          "longitude": 77.41012
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-11-11",
        "name": "INDIAN OIL PETROL PUMP",
        "sequence": 11,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.29596,
          "longitude": 77.40508
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-11-12",
        "name": "SISTec GN",
        "sequence": 12,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-12",
    "routeNumber": "Route 12",
    "title": "COACH FACTORY",
    "origin": "COACH FACTORY",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:00",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#6366F1",
    "activeBus": {
      "id": "bus-12",
      "routeId": "route-12",
      "plateNumber": "MP-04-HE-2012",
      "capacity": 52,
      "occupiedSeats": 38,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 47,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.27903,
        "longitude": 77.41802
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-12-1",
      "driver": {
        "id": "drv-12",
        "name": "Jitendra",
        "phone": "+91 7880131512",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-112"
      },
      "conductor": {
        "id": "cnd-12",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-212"
      }
    },
    "stops": [
      {
        "id": "stop-12-1",
        "name": "COACH FACTORY",
        "sequence": 1,
        "scheduledTime": "8:00",
        "estimatedTime": "8:00",
        "coordinates": {
          "latitude": 23.27903,
          "longitude": 77.41802
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-2",
        "name": "DWARKA NAGAR",
        "sequence": 2,
        "scheduledTime": "8:02",
        "estimatedTime": "8:02",
        "coordinates": {
          "latitude": 23.27319,
          "longitude": 77.41369
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-3",
        "name": "BHOPAL RAILWAY STATION",
        "sequence": 3,
        "scheduledTime": "8:05",
        "estimatedTime": "8:05",
        "coordinates": {
          "latitude": 23.2693,
          "longitude": 77.4082
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-4",
        "name": "NADRA BUS STOP",
        "sequence": 4,
        "scheduledTime": "8:15",
        "estimatedTime": "8:15",
        "coordinates": {
          "latitude": 23.26951,
          "longitude": 77.40094
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-5",
        "name": "PHOOTA MAKBARA",
        "sequence": 5,
        "scheduledTime": "8:17",
        "estimatedTime": "8:17",
        "coordinates": {
          "latitude": 23.26975,
          "longitude": 77.40098
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-6",
        "name": "DHARAM KANTA",
        "sequence": 6,
        "scheduledTime": "8:20",
        "estimatedTime": "8:20",
        "coordinates": {
          "latitude": 23.27,
          "longitude": 77.401
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-7",
        "name": "GANESH MANDIR",
        "sequence": 7,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.2047,
          "longitude": 77.08531
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-8",
        "name": "J P NAGAR",
        "sequence": 8,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.27444,
          "longitude": 77.40237
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-9",
        "name": "ARIF NAGAR BRIDGE",
        "sequence": 9,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.278,
          "longitude": 77.4022
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-10",
        "name": "MANDI GATE",
        "sequence": 10,
        "scheduledTime": "8:37",
        "estimatedTime": "8:37",
        "coordinates": {
          "latitude": 23.28029,
          "longitude": 77.40049
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-11",
        "name": "SHIV MANDIR",
        "sequence": 11,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.28376,
          "longitude": 77.39996
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-12",
        "name": "BEST PRICE KAROND",
        "sequence": 12,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.2989,
          "longitude": 77.3964
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-13",
        "name": "CENTRAL BANK",
        "sequence": 13,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.30104,
          "longitude": 77.3731
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-12-14",
        "name": "SISTec GN",
        "sequence": 14,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-14",
    "routeNumber": "Route 14",
    "title": "KAROND",
    "origin": "ADHAR HOSPITAL",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:40",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#14B8A6",
    "activeBus": {
      "id": "bus-14",
      "routeId": "route-14",
      "plateNumber": "MP-04-HE-2014",
      "capacity": 52,
      "occupiedSeats": 40,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 49,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.29305,
        "longitude": 77.41002
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-14-1",
      "driver": {
        "id": "drv-14",
        "name": "Rizwan",
        "phone": "+91 7880131514",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-114"
      },
      "conductor": {
        "id": "cnd-14",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-214"
      }
    },
    "stops": [
      {
        "id": "stop-14-1",
        "name": "ADHAR HOSPITAL",
        "sequence": 1,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.293,
          "longitude": 77.41
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-14-2",
        "name": "KAROND CHAURAHA",
        "sequence": 2,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.2995,
          "longitude": 77.397
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-14-3",
        "name": "NEW JAIL ROAD",
        "sequence": 3,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.307,
          "longitude": 77.382
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-14-4",
        "name": "SISTec GN",
        "sequence": 4,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-15",
    "routeNumber": "Route 15",
    "title": "KAROND",
    "origin": "ADHAR HOSPITAL",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:40",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#EAB308",
    "activeBus": {
      "id": "bus-15",
      "routeId": "route-15",
      "plateNumber": "MP-04-HE-2015",
      "capacity": 52,
      "occupiedSeats": 41,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 35,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.29305,
        "longitude": 77.41002
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-15-1",
      "driver": {
        "id": "drv-15",
        "name": "Imraan",
        "phone": "+91 7880131515",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-115"
      },
      "conductor": {
        "id": "cnd-15",
        "name": "Afzal Alam",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-215"
      }
    },
    "stops": [
      {
        "id": "stop-15-1",
        "name": "ADHAR HOSPITAL",
        "sequence": 1,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.293,
          "longitude": 77.41
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-15-2",
        "name": "KAROND CHAURAHA",
        "sequence": 2,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.2995,
          "longitude": 77.397
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-15-3",
        "name": "RGPV",
        "sequence": 3,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.3105,
          "longitude": 77.3616
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-15-4",
        "name": "SISTec GN",
        "sequence": 4,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-16",
    "routeNumber": "Route 16",
    "title": "BERASIA",
    "origin": "BASAI",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "7:30",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#4ECCA3",
    "activeBus": {
      "id": "bus-16",
      "routeId": "route-16",
      "plateNumber": "MP-04-HE-2016",
      "capacity": 52,
      "occupiedSeats": 42,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 36,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.62988,
        "longitude": 77.42917
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-16-1",
      "driver": {
        "id": "drv-16",
        "name": "Kapil",
        "phone": "+91 7880131516",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-116"
      },
      "conductor": {
        "id": "cnd-16",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-216"
      }
    },
    "stops": [
      {
        "id": "stop-16-1",
        "name": "BASAI",
        "sequence": 1,
        "scheduledTime": "7:30",
        "estimatedTime": "7:30",
        "coordinates": {
          "latitude": 23.62988,
          "longitude": 77.42917
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-16-2",
        "name": "CHOPDA BAZAR",
        "sequence": 2,
        "scheduledTime": "7:40",
        "estimatedTime": "7:40",
        "coordinates": {
          "latitude": 23.281,
          "longitude": 77.415
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-16-3",
        "name": "BAL VIHAR",
        "sequence": 3,
        "scheduledTime": "7:42",
        "estimatedTime": "7:42",
        "coordinates": {
          "latitude": 23.43572,
          "longitude": 77.3999
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-16-4",
        "name": "RANGE CHOURAHA BUS STAND",
        "sequence": 4,
        "scheduledTime": "7:45",
        "estimatedTime": "7:45",
        "coordinates": {
          "latitude": 23.60241,
          "longitude": 77.42588
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-16-5",
        "name": "NAND GAON",
        "sequence": 5,
        "scheduledTime": "7:50",
        "estimatedTime": "7:50",
        "coordinates": {
          "latitude": 23.57312,
          "longitude": 77.43647
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-16-6",
        "name": "ICHGIRI",
        "sequence": 6,
        "scheduledTime": "8:10",
        "estimatedTime": "8:10",
        "coordinates": {
          "latitude": 23.5431,
          "longitude": 77.4356
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-16-7",
        "name": "GUNGA",
        "sequence": 7,
        "scheduledTime": "8:20",
        "estimatedTime": "8:20",
        "coordinates": {
          "latitude": 23.49525,
          "longitude": 77.43213
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-16-8",
        "name": "DUPADIA",
        "sequence": 8,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.4462,
          "longitude": 77.4111
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-16-9",
        "name": "SISTec GN",
        "sequence": 9,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-18",
    "routeNumber": "Route 18",
    "title": "SHANTI NIKETAN",
    "origin": "SHANTI NIKETAN",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:10",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#38BDF8",
    "activeBus": {
      "id": "bus-18",
      "routeId": "route-18",
      "plateNumber": "MP-04-HE-2018",
      "capacity": 52,
      "occupiedSeats": 44,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 38,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.24797,
        "longitude": 77.43196
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-18-1",
      "driver": {
        "id": "drv-18",
        "name": "Jitendra",
        "phone": "+91 7880131518",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-118"
      },
      "conductor": {
        "id": "cnd-18",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-218"
      }
    },
    "stops": [
      {
        "id": "stop-18-1",
        "name": "SHANTI NIKETAN",
        "sequence": 1,
        "scheduledTime": "8:10",
        "estimatedTime": "8:10",
        "coordinates": {
          "latitude": 23.24797,
          "longitude": 77.43196
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-2",
        "name": "RACHNA NAGAR",
        "sequence": 2,
        "scheduledTime": "8:12",
        "estimatedTime": "8:12",
        "coordinates": {
          "latitude": 23.2473,
          "longitude": 77.4322
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-3",
        "name": "SEVANTIKA PETROL PUMP",
        "sequence": 3,
        "scheduledTime": "8:15",
        "estimatedTime": "8:15",
        "coordinates": {
          "latitude": 23.24812,
          "longitude": 77.43136
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-4",
        "name": "SUBHASH NAGAR FATAK",
        "sequence": 4,
        "scheduledTime": "8:17",
        "estimatedTime": "8:17",
        "coordinates": {
          "latitude": 23.2502,
          "longitude": 77.428
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-5",
        "name": "PRABHAT CHAURAHA",
        "sequence": 5,
        "scheduledTime": "8:20",
        "estimatedTime": "8:20",
        "coordinates": {
          "latitude": 23.25373,
          "longitude": 77.42512
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-6",
        "name": "ASHOKA GARDEN MANDI CHAURAHA",
        "sequence": 6,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.2594,
          "longitude": 77.4252
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-7",
        "name": "CAPITAL PETROL PUMP",
        "sequence": 7,
        "scheduledTime": "8:27",
        "estimatedTime": "8:27",
        "coordinates": {
          "latitude": 23.26,
          "longitude": 77.4249
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-8",
        "name": "BHARAT TALKIES",
        "sequence": 8,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.2622,
          "longitude": 77.4134
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-9",
        "name": "ALPANA TIRAHA",
        "sequence": 9,
        "scheduledTime": "8:37",
        "estimatedTime": "8:37",
        "coordinates": {
          "latitude": 23.2619,
          "longitude": 77.4088
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-10",
        "name": "SHAHJEHANABAD THANA",
        "sequence": 10,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.268,
          "longitude": 77.3949
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-11",
        "name": "ADARSH HOSPITAL",
        "sequence": 11,
        "scheduledTime": "8:42",
        "estimatedTime": "8:42",
        "coordinates": {
          "latitude": 23.2753,
          "longitude": 77.3691
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-12",
        "name": "BAB E ALI STADIUM",
        "sequence": 12,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.27893,
          "longitude": 77.36286
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-13",
        "name": "PARI BAZAR",
        "sequence": 13,
        "scheduledTime": "8:48",
        "estimatedTime": "8:48",
        "coordinates": {
          "latitude": 23.28383,
          "longitude": 77.35754
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-14",
        "name": "ST JOSEPH IDGAH HILLS",
        "sequence": 14,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.2887,
          "longitude": 77.35217
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-15",
        "name": "POLICE COLONY",
        "sequence": 15,
        "scheduledTime": "8:52",
        "estimatedTime": "8:52",
        "coordinates": {
          "latitude": 23.29493,
          "longitude": 77.3544
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-18-16",
        "name": "SISTec GN",
        "sequence": 16,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-21",
    "routeNumber": "Route 21",
    "title": "SEHORE JHAGARIYA",
    "origin": "GANESH MANDIR",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "7:00",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#F59E0B",
    "activeBus": {
      "id": "bus-21",
      "routeId": "route-21",
      "plateNumber": "MP-04-HE-2021",
      "capacity": 52,
      "occupiedSeats": 47,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 41,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.2047,
        "longitude": 77.08531
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-21-1",
      "driver": {
        "id": "drv-21",
        "name": "Santosh",
        "phone": "+91 7880131521",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-121"
      },
      "conductor": {
        "id": "cnd-21",
        "name": "Afzal Alam",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-221"
      }
    },
    "stops": [
      {
        "id": "stop-21-1",
        "name": "GANESH MANDIR",
        "sequence": 1,
        "scheduledTime": "7:00",
        "estimatedTime": "7:00",
        "coordinates": {
          "latitude": 23.205,
          "longitude": 77.085
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-21-2",
        "name": "ITC CHAUPAL",
        "sequence": 2,
        "scheduledTime": "7:15",
        "estimatedTime": "7:15",
        "coordinates": {
          "latitude": 23.20736,
          "longitude": 77.10055
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-21-3",
        "name": "CRESCENT CHAURAHA",
        "sequence": 3,
        "scheduledTime": "7:20",
        "estimatedTime": "7:20",
        "coordinates": {
          "latitude": 23.21204,
          "longitude": 77.12074
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-21-4",
        "name": "BARKHEDI",
        "sequence": 4,
        "scheduledTime": "7:40",
        "estimatedTime": "7:40",
        "coordinates": {
          "latitude": 23.21976,
          "longitude": 77.14241
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-21-5",
        "name": "HIRAPUR",
        "sequence": 5,
        "scheduledTime": "7:45",
        "estimatedTime": "7:45",
        "coordinates": {
          "latitude": 23.2117,
          "longitude": 77.2012
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-21-6",
        "name": "BILKISGANJ",
        "sequence": 6,
        "scheduledTime": "8:00",
        "estimatedTime": "8:00",
        "coordinates": {
          "latitude": 23.2341,
          "longitude": 77.2511
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-21-7",
        "name": "RATIBAD",
        "sequence": 7,
        "scheduledTime": "8:10",
        "estimatedTime": "8:10",
        "coordinates": {
          "latitude": 23.21004,
          "longitude": 77.39502
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-21-8",
        "name": "NEELBAD",
        "sequence": 8,
        "scheduledTime": "8:15",
        "estimatedTime": "8:15",
        "coordinates": {
          "latitude": 23.21983,
          "longitude": 77.3164
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-21-9",
        "name": "KHAJURI",
        "sequence": 9,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.24513,
          "longitude": 77.25177
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-21-10",
        "name": "SISTec GN",
        "sequence": 10,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-24",
    "routeNumber": "Route 24",
    "title": "NEORI MANDIR",
    "origin": "NEORI MANDIR",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:45",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#A78BFA",
    "activeBus": {
      "id": "bus-24",
      "routeId": "route-24",
      "plateNumber": "MP-04-HE-2024",
      "capacity": 52,
      "occupiedSeats": 38,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 44,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.28174,
        "longitude": 77.36513
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-24-1",
      "driver": {
        "id": "drv-24",
        "name": "Chand",
        "phone": "+91 7880131524",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-124"
      },
      "conductor": {
        "id": "cnd-24",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-224"
      }
    },
    "stops": [
      {
        "id": "stop-24-1",
        "name": "NEORI MANDIR",
        "sequence": 1,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.28174,
          "longitude": 77.36513
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-24-2",
        "name": "LALGHATI",
        "sequence": 2,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.27991,
          "longitude": 77.36201
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-24-3",
        "name": "SISTec GN",
        "sequence": 3,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-26",
    "routeNumber": "Route 26",
    "title": "MATA MANDIR",
    "origin": "JAWAHAR CHOWK",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:00",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#F43F5E",
    "activeBus": {
      "id": "bus-26",
      "routeId": "route-26",
      "plateNumber": "MP-04-HE-2026",
      "capacity": 52,
      "occupiedSeats": 40,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 46,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.22798,
        "longitude": 77.39498
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-26-1",
      "driver": {
        "id": "drv-26",
        "name": "Nilesh",
        "phone": "+91 7880131526",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-126"
      },
      "conductor": {
        "id": "cnd-26",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-226"
      }
    },
    "stops": [
      {
        "id": "stop-26-1",
        "name": "JAWAHAR CHOWK",
        "sequence": 1,
        "scheduledTime": "8:00",
        "estimatedTime": "8:00",
        "coordinates": {
          "latitude": 23.22798,
          "longitude": 77.39498
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-26-2",
        "name": "DEPOT SQUARE",
        "sequence": 2,
        "scheduledTime": "8:02",
        "estimatedTime": "8:02",
        "coordinates": {
          "latitude": 23.2243,
          "longitude": 77.3953
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-26-3",
        "name": "PNT SQUARE",
        "sequence": 3,
        "scheduledTime": "8:07",
        "estimatedTime": "8:07",
        "coordinates": {
          "latitude": 23.22197,
          "longitude": 77.39509
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-26-4",
        "name": "GEETANJLI SQUARE",
        "sequence": 4,
        "scheduledTime": "8:10",
        "estimatedTime": "8:10",
        "coordinates": {
          "latitude": 23.21944,
          "longitude": 77.39688
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-26-5",
        "name": "MANIT",
        "sequence": 5,
        "scheduledTime": "8:12",
        "estimatedTime": "8:12",
        "coordinates": {
          "latitude": 23.215,
          "longitude": 77.4067
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-26-6",
        "name": "LAL PARADE",
        "sequence": 6,
        "scheduledTime": "8:17",
        "estimatedTime": "8:17",
        "coordinates": {
          "latitude": 23.24312,
          "longitude": 77.40933
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-26-7",
        "name": "CHABBAN CHAUARAHA",
        "sequence": 7,
        "scheduledTime": "8:20",
        "estimatedTime": "8:20",
        "coordinates": {
          "latitude": 23.2437,
          "longitude": 77.4119
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-26-8",
        "name": "JEHANGIRABAD",
        "sequence": 8,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.2476,
          "longitude": 77.4124
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-26-9",
        "name": "JINSI CHOWKI",
        "sequence": 9,
        "scheduledTime": "8:37",
        "estimatedTime": "8:37",
        "coordinates": {
          "latitude": 23.25,
          "longitude": 77.4173
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-26-10",
        "name": "RAMBHA TALKIES",
        "sequence": 10,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.25634,
          "longitude": 77.39763
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-26-11",
        "name": "LILI TALKIES CHAURAHA",
        "sequence": 11,
        "scheduledTime": "8:42",
        "estimatedTime": "8:42",
        "coordinates": {
          "latitude": 23.26833,
          "longitude": 77.37778
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-26-12",
        "name": "KHATLAPURA",
        "sequence": 12,
        "scheduledTime": "8:44",
        "estimatedTime": "8:44",
        "coordinates": {
          "latitude": 23.28185,
          "longitude": 77.35965
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-26-13",
        "name": "SISTec GN",
        "sequence": 13,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-27",
    "routeNumber": "Route 27",
    "title": "MOTI MASJID",
    "origin": "MOTI MASJID",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:30",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#10B981",
    "activeBus": {
      "id": "bus-27",
      "routeId": "route-27",
      "plateNumber": "MP-04-HE-2027",
      "capacity": 52,
      "occupiedSeats": 41,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 47,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.25759,
        "longitude": 77.39818
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-27-1",
      "driver": {
        "id": "drv-27",
        "name": "Mor Singh",
        "phone": "+91 7880131527",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-127"
      },
      "conductor": {
        "id": "cnd-27",
        "name": "Afzal Alam",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-227"
      }
    },
    "stops": [
      {
        "id": "stop-27-1",
        "name": "MOTI MASJID",
        "sequence": 1,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.25759,
          "longitude": 77.39818
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-27-2",
        "name": "ROYAL MARKET",
        "sequence": 2,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.2608,
          "longitude": 77.3939
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-27-3",
        "name": "STATE BANK CHAURAHA",
        "sequence": 3,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.265,
          "longitude": 77.389
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-27-4",
        "name": "KOH E FIZA",
        "sequence": 4,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.27103,
          "longitude": 77.3816
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-27-5",
        "name": "BHOOT BUNGLOW",
        "sequence": 5,
        "scheduledTime": "8:48",
        "estimatedTime": "8:48",
        "coordinates": {
          "latitude": 23.275,
          "longitude": 77.375
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-27-6",
        "name": "LALGHATI CIRCLE",
        "sequence": 6,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.27991,
          "longitude": 77.36201
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-27-7",
        "name": "SUDITI HOSPITAL",
        "sequence": 7,
        "scheduledTime": "8:52",
        "estimatedTime": "8:52",
        "coordinates": {
          "latitude": 23.28261,
          "longitude": 77.35809
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-27-8",
        "name": "DATA COLONY",
        "sequence": 8,
        "scheduledTime": "8:55",
        "estimatedTime": "8:55",
        "coordinates": {
          "latitude": 23.282,
          "longitude": 77.355
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-27-9",
        "name": "SISTec GN",
        "sequence": 9,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-30",
    "routeNumber": "Route 30",
    "title": "KOLAR KAJLIKHEDA",
    "origin": "KAJLI KHEDA",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "7:35",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#EC4899",
    "activeBus": {
      "id": "bus-30",
      "routeId": "route-30",
      "plateNumber": "MP-04-HE-2030",
      "capacity": 52,
      "occupiedSeats": 44,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 35,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.16996,
        "longitude": 77.41785
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-30-1",
      "driver": {
        "id": "drv-30",
        "name": "Goma",
        "phone": "+91 7880131530",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-130"
      },
      "conductor": {
        "id": "cnd-30",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-230"
      }
    },
    "stops": [
      {
        "id": "stop-30-1",
        "name": "KAJLI KHEDA",
        "sequence": 1,
        "scheduledTime": "7:35",
        "estimatedTime": "7:35",
        "coordinates": {
          "latitude": 23.16996,
          "longitude": 77.41785
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-30-2",
        "name": "IBD COLONY",
        "sequence": 2,
        "scheduledTime": "7:40",
        "estimatedTime": "7:40",
        "coordinates": {
          "latitude": 23.1732,
          "longitude": 77.4146
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-30-3",
        "name": "ENGLISH VILLA",
        "sequence": 3,
        "scheduledTime": "7:45",
        "estimatedTime": "7:45",
        "coordinates": {
          "latitude": 23.17599,
          "longitude": 77.41503
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-30-4",
        "name": "D MART",
        "sequence": 4,
        "scheduledTime": "7:42",
        "estimatedTime": "7:42",
        "coordinates": {
          "latitude": 23.17997,
          "longitude": 77.41432
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-30-5",
        "name": "BANSKHEDI COMFORT SCHOOL",
        "sequence": 5,
        "scheduledTime": "7:48",
        "estimatedTime": "7:48",
        "coordinates": {
          "latitude": 23.183,
          "longitude": 77.4129
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-30-6",
        "name": "LALITA NAGAR",
        "sequence": 6,
        "scheduledTime": "7:50",
        "estimatedTime": "7:50",
        "coordinates": {
          "latitude": 23.1848,
          "longitude": 77.4119
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-30-7",
        "name": "BHOPAL PUBLIC SCHOOL",
        "sequence": 7,
        "scheduledTime": "7:55",
        "estimatedTime": "7:55",
        "coordinates": {
          "latitude": 23.1891,
          "longitude": 77.4105
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-30-8",
        "name": "GOOD SHEPERD COLONY",
        "sequence": 8,
        "scheduledTime": "7:58",
        "estimatedTime": "7:58",
        "coordinates": {
          "latitude": 23.1899,
          "longitude": 77.41
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-30-9",
        "name": "BIMA KUNJ",
        "sequence": 9,
        "scheduledTime": "8:00",
        "estimatedTime": "8:00",
        "coordinates": {
          "latitude": 23.19477,
          "longitude": 77.40929
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-30-10",
        "name": "SURAJ NAGAR RATIBAD ROAD",
        "sequence": 10,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.2209,
          "longitude": 77.4038
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-30-11",
        "name": "BHADBHADA CHUARAHA",
        "sequence": 11,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.2771,
          "longitude": 77.3578
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-30-12",
        "name": "SAYDRI COMPLEX",
        "sequence": 12,
        "scheduledTime": "8:48",
        "estimatedTime": "8:48",
        "coordinates": {
          "latitude": 23.28769,
          "longitude": 77.35334
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-30-13",
        "name": "SISTec GN",
        "sequence": 13,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-31",
    "routeNumber": "Route 31",
    "title": "MANDIDEEP KATARA HILLS",
    "origin": "NANAKHEDI",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "7:20",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#6366F1",
    "activeBus": {
      "id": "bus-31",
      "routeId": "route-31",
      "plateNumber": "MP-04-HE-2031",
      "capacity": 52,
      "occupiedSeats": 45,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 36,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.12012,
        "longitude": 77.52995
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-31-1",
      "driver": {
        "id": "drv-31",
        "name": "Raj Kumar",
        "phone": "+91 7880131531",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-131"
      },
      "conductor": {
        "id": "cnd-31",
        "name": "Afzal Alam",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-231"
      }
    },
    "stops": [
      {
        "id": "stop-31-1",
        "name": "NANAKHEDI",
        "sequence": 1,
        "scheduledTime": "7:20",
        "estimatedTime": "7:20",
        "coordinates": {
          "latitude": 23.12012,
          "longitude": 77.52995
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-2",
        "name": "SATLAPUR",
        "sequence": 2,
        "scheduledTime": "7:30",
        "estimatedTime": "7:30",
        "coordinates": {
          "latitude": 23.1324,
          "longitude": 77.5262
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-3",
        "name": "HEG (MANDIDEEP)",
        "sequence": 3,
        "scheduledTime": "7:40",
        "estimatedTime": "7:40",
        "coordinates": {
          "latitude": 23.14626,
          "longitude": 77.52383
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-4",
        "name": "KRISHNAPURAM",
        "sequence": 4,
        "scheduledTime": "7:45",
        "estimatedTime": "7:45",
        "coordinates": {
          "latitude": 23.1544,
          "longitude": 77.5113
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-5",
        "name": "MILE SQUARE",
        "sequence": 5,
        "scheduledTime": "7:50",
        "estimatedTime": "7:50",
        "coordinates": {
          "latitude": 23.17143,
          "longitude": 77.50171
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-6",
        "name": "KATARA HILLS",
        "sequence": 6,
        "scheduledTime": "8:10",
        "estimatedTime": "8:10",
        "coordinates": {
          "latitude": 23.19017,
          "longitude": 77.48479
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-7",
        "name": "RAJA BHOJ ARCADE",
        "sequence": 7,
        "scheduledTime": "8:15",
        "estimatedTime": "8:15",
        "coordinates": {
          "latitude": 23.19729,
          "longitude": 77.47518
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-8",
        "name": "ASHIMA MALL",
        "sequence": 8,
        "scheduledTime": "8:20",
        "estimatedTime": "8:20",
        "coordinates": {
          "latitude": 23.2056,
          "longitude": 77.4621
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-9",
        "name": "CHINAR COLONY",
        "sequence": 9,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.2145,
          "longitude": 77.4554
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-10",
        "name": "DANISH NAGAR",
        "sequence": 10,
        "scheduledTime": "8:27",
        "estimatedTime": "8:27",
        "coordinates": {
          "latitude": 23.2205,
          "longitude": 77.452
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-11",
        "name": "BAGSEWANIA CHAURAHA",
        "sequence": 11,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.22535,
          "longitude": 77.44552
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-12",
        "name": "BARKATULLAH UNIVERSITY",
        "sequence": 12,
        "scheduledTime": "8:32",
        "estimatedTime": "8:32",
        "coordinates": {
          "latitude": 23.22885,
          "longitude": 77.44592
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-13",
        "name": "CHETAK BRIDGE",
        "sequence": 13,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.235,
          "longitude": 77.4422
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-14",
        "name": "BOARD OFFICE",
        "sequence": 14,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.2335,
          "longitude": 77.4352
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-15",
        "name": "NUTAN CHAURAHA",
        "sequence": 15,
        "scheduledTime": "8:42",
        "estimatedTime": "8:42",
        "coordinates": {
          "latitude": 23.23085,
          "longitude": 77.42468
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-16",
        "name": "NO DURGA PETRL PUMP",
        "sequence": 16,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.2348,
          "longitude": 77.418
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-17",
        "name": "HOSPITAL",
        "sequence": 17,
        "scheduledTime": "8:48",
        "estimatedTime": "8:48",
        "coordinates": {
          "latitude": 23.28299,
          "longitude": 77.35846
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-18",
        "name": "ROSHANPURA CHAURAHA",
        "sequence": 18,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.29119,
          "longitude": 77.35279
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-31-19",
        "name": "SISTec GN",
        "sequence": 19,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-32",
    "routeNumber": "Route 32",
    "title": "VIDISHA",
    "origin": "BUNTY NAGAR",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "7:20",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#14B8A6",
    "activeBus": {
      "id": "bus-32",
      "routeId": "route-32",
      "plateNumber": "MP-04-HE-2032",
      "capacity": 52,
      "occupiedSeats": 46,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 37,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.51985,
        "longitude": 77.81008
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-32-1",
      "driver": {
        "id": "drv-32",
        "name": "Shivraj",
        "phone": "+91 8120346465",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-132"
      },
      "conductor": {
        "id": "cnd-32",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-232"
      }
    },
    "stops": [
      {
        "id": "stop-32-1",
        "name": "BUNTY NAGAR",
        "sequence": 1,
        "scheduledTime": "7:20",
        "estimatedTime": "7:20",
        "coordinates": {
          "latitude": 23.51985,
          "longitude": 77.81008
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-2",
        "name": "AHMEDPUR CIRCLE",
        "sequence": 2,
        "scheduledTime": "7:25",
        "estimatedTime": "7:25",
        "coordinates": {
          "latitude": 23.5178,
          "longitude": 77.7979
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-3",
        "name": "DURGA NAGAR",
        "sequence": 3,
        "scheduledTime": "7:27",
        "estimatedTime": "7:27",
        "coordinates": {
          "latitude": 23.51035,
          "longitude": 77.78965
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-4",
        "name": "NEEMTAL CIRCLE",
        "sequence": 4,
        "scheduledTime": "7:30",
        "estimatedTime": "7:30",
        "coordinates": {
          "latitude": 23.50592,
          "longitude": 77.77923
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-5",
        "name": "GULAB VATIKA",
        "sequence": 5,
        "scheduledTime": "7:33",
        "estimatedTime": "7:33",
        "coordinates": {
          "latitude": 23.50008,
          "longitude": 77.76997
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-6",
        "name": "IDGAH CHAURAHA",
        "sequence": 6,
        "scheduledTime": "7:40",
        "estimatedTime": "7:40",
        "coordinates": {
          "latitude": 23.49583,
          "longitude": 77.75976
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-7",
        "name": "SANCHI",
        "sequence": 7,
        "scheduledTime": "7:50",
        "estimatedTime": "7:50",
        "coordinates": {
          "latitude": 23.47943,
          "longitude": 77.73063
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-8",
        "name": "DEEWANGANJ",
        "sequence": 8,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.4571,
          "longitude": 77.6211
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-9",
        "name": "SUKHI SEWANIA",
        "sequence": 9,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.3532,
          "longitude": 77.4865
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-10",
        "name": "ISLAM NAGAR",
        "sequence": 10,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.3298,
          "longitude": 77.4505
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-11",
        "name": "ALVAR NAGAR",
        "sequence": 11,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.34221,
          "longitude": 77.41894
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-12",
        "name": "ACHARPURA",
        "sequence": 12,
        "scheduledTime": "8:55",
        "estimatedTime": "8:55",
        "coordinates": {
          "latitude": 23.315,
          "longitude": 77.3902
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-13",
        "name": "DOBRA",
        "sequence": 13,
        "scheduledTime": "8:57",
        "estimatedTime": "8:57",
        "coordinates": {
          "latitude": 23.3094,
          "longitude": 77.375
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-14",
        "name": "PATANJLI PARISAR",
        "sequence": 14,
        "scheduledTime": "9:00",
        "estimatedTime": "9:00",
        "coordinates": {
          "latitude": 23.30113,
          "longitude": 77.36111
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-32-15",
        "name": "SISTec GN",
        "sequence": 15,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-33",
    "routeNumber": "Route 33",
    "title": "SEHORE",
    "origin": "BIJORI",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "7:25",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#EAB308",
    "activeBus": {
      "id": "bus-33",
      "routeId": "route-33",
      "plateNumber": "MP-04-HE-2033",
      "capacity": 52,
      "occupiedSeats": 47,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 38,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.19854,
        "longitude": 77.06259
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-33-1",
      "driver": {
        "id": "drv-33",
        "name": "Irfan Shah",
        "phone": "+91 7880131533",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-133"
      },
      "conductor": {
        "id": "cnd-33",
        "name": "Afzal Alam",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-233"
      }
    },
    "stops": [
      {
        "id": "stop-33-1",
        "name": "BIJORI",
        "sequence": 1,
        "scheduledTime": "7:25",
        "estimatedTime": "7:25",
        "coordinates": {
          "latitude": 23.19854,
          "longitude": 77.06259
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-2",
        "name": "MANDI THANA SEHORE",
        "sequence": 2,
        "scheduledTime": "7:27",
        "estimatedTime": "7:27",
        "coordinates": {
          "latitude": 23.20661,
          "longitude": 77.06509
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-3",
        "name": "NARSINGARH NAKA",
        "sequence": 3,
        "scheduledTime": "7:30",
        "estimatedTime": "7:30",
        "coordinates": {
          "latitude": 23.2065,
          "longitude": 77.0752
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-4",
        "name": "REST HOUSE CIRCLE",
        "sequence": 4,
        "scheduledTime": "7:35",
        "estimatedTime": "7:35",
        "coordinates": {
          "latitude": 23.20522,
          "longitude": 77.08008
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-5",
        "name": "LUNIA CIRCLE",
        "sequence": 5,
        "scheduledTime": "7:40",
        "estimatedTime": "7:40",
        "coordinates": {
          "latitude": 23.2075,
          "longitude": 77.085
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-6",
        "name": "SUGAR FACTORY",
        "sequence": 6,
        "scheduledTime": "7:45",
        "estimatedTime": "7:45",
        "coordinates": {
          "latitude": 23.207,
          "longitude": 77.0882
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-7",
        "name": "TEHSIL CIRCLE",
        "sequence": 7,
        "scheduledTime": "7:48",
        "estimatedTime": "7:48",
        "coordinates": {
          "latitude": 23.2065,
          "longitude": 77.0974
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-8",
        "name": "EXCELLENCE SCHOOL",
        "sequence": 8,
        "scheduledTime": "7:50",
        "estimatedTime": "7:50",
        "coordinates": {
          "latitude": 23.20766,
          "longitude": 77.10184
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-9",
        "name": "INDORE NAKA",
        "sequence": 9,
        "scheduledTime": "7:55",
        "estimatedTime": "7:55",
        "coordinates": {
          "latitude": 23.21,
          "longitude": 77.1081
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-10",
        "name": "GURUDWARA SAHIB SEHORE",
        "sequence": 10,
        "scheduledTime": "8:00",
        "estimatedTime": "8:00",
        "coordinates": {
          "latitude": 23.21,
          "longitude": 77.1089
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-11",
        "name": "SEHORE BUS STAND",
        "sequence": 11,
        "scheduledTime": "8:02",
        "estimatedTime": "8:02",
        "coordinates": {
          "latitude": 23.2115,
          "longitude": 77.11875
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-12",
        "name": "BHOPAL NAKA",
        "sequence": 12,
        "scheduledTime": "8:05",
        "estimatedTime": "8:05",
        "coordinates": {
          "latitude": 23.2124,
          "longitude": 77.1222
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-13",
        "name": "CHANKYAPURI",
        "sequence": 13,
        "scheduledTime": "8:10",
        "estimatedTime": "8:10",
        "coordinates": {
          "latitude": 23.2166,
          "longitude": 77.1326
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-14",
        "name": "HOUSING BOARD COLONY",
        "sequence": 14,
        "scheduledTime": "8:15",
        "estimatedTime": "8:15",
        "coordinates": {
          "latitude": 23.2226,
          "longitude": 77.1452
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-15",
        "name": "THUNA",
        "sequence": 15,
        "scheduledTime": "8:20",
        "estimatedTime": "8:20",
        "coordinates": {
          "latitude": 23.22356,
          "longitude": 77.15928
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-16",
        "name": "LASUDIA PARIHAR",
        "sequence": 16,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.2223,
          "longitude": 77.1822
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-17",
        "name": "FANDA",
        "sequence": 17,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.2431,
          "longitude": 77.2113
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-18",
        "name": "KHAJURI",
        "sequence": 18,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.25,
          "longitude": 77.25
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-19",
        "name": "KOLUKHEDI",
        "sequence": 19,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.25788,
          "longitude": 77.26424
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-20",
        "name": "IISER",
        "sequence": 20,
        "scheduledTime": "8:55",
        "estimatedTime": "8:55",
        "coordinates": {
          "latitude": 23.28099,
          "longitude": 77.27874
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-21",
        "name": "MUBARAKPUR TOLL",
        "sequence": 21,
        "scheduledTime": "9:00",
        "estimatedTime": "9:00",
        "coordinates": {
          "latitude": 23.28488,
          "longitude": 77.30994
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-33-22",
        "name": "SISTec GN",
        "sequence": 22,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-34",
    "routeNumber": "Route 34",
    "title": "NARSINGARH",
    "origin": "NARSINGARH",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "7:30",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#4ECCA3",
    "activeBus": {
      "id": "bus-34",
      "routeId": "route-34",
      "plateNumber": "MP-04-HE-2034",
      "capacity": 52,
      "occupiedSeats": 48,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 39,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.20082,
        "longitude": 77.07633
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-34-1",
      "driver": {
        "id": "drv-34",
        "name": "Shareef",
        "phone": "+91 7880131534",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-134"
      },
      "conductor": {
        "id": "cnd-34",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-234"
      }
    },
    "stops": [
      {
        "id": "stop-34-1",
        "name": "NARSINGARH",
        "sequence": 1,
        "scheduledTime": "7:30",
        "estimatedTime": "7:30",
        "coordinates": {
          "latitude": 23.20082,
          "longitude": 77.07633
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-34-2",
        "name": "TEEJ BADI",
        "sequence": 2,
        "scheduledTime": "7:45",
        "estimatedTime": "7:45",
        "coordinates": {
          "latitude": 23.6736,
          "longitude": 77.0671
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-34-3",
        "name": "TODINICHA",
        "sequence": 3,
        "scheduledTime": "7:50",
        "estimatedTime": "7:50",
        "coordinates": {
          "latitude": 23.64,
          "longitude": 77.0748
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-34-4",
        "name": "JAMUNIA DHABA",
        "sequence": 4,
        "scheduledTime": "7:55",
        "estimatedTime": "7:55",
        "coordinates": {
          "latitude": 23.6043,
          "longitude": 77.064
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-34-5",
        "name": "JHADLA",
        "sequence": 5,
        "scheduledTime": "8:10",
        "estimatedTime": "8:10",
        "coordinates": {
          "latitude": 23.5588,
          "longitude": 77.0485
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-34-6",
        "name": "KURAWAR",
        "sequence": 6,
        "scheduledTime": "8:20",
        "estimatedTime": "8:20",
        "coordinates": {
          "latitude": 23.49631,
          "longitude": 77.01844
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-34-7",
        "name": "HINGONI",
        "sequence": 7,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.5097,
          "longitude": 77.0347
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-34-8",
        "name": "MAHADEV",
        "sequence": 8,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.5075,
          "longitude": 77.0354
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-34-9",
        "name": "SISTec GN",
        "sequence": 9,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-37",
    "routeNumber": "Route 37",
    "title": "ASHOKA GARDEN",
    "origin": "GOVINDPURA BIJLI GATE",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:15",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#38BDF8",
    "activeBus": {
      "id": "bus-37",
      "routeId": "route-37",
      "plateNumber": "MP-04-HE-2037",
      "capacity": 52,
      "occupiedSeats": 39,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 42,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.25191,
        "longitude": 77.437
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-37-1",
      "driver": {
        "id": "drv-37",
        "name": "Faheem",
        "phone": "+91 7880131537",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-137"
      },
      "conductor": {
        "id": "cnd-37",
        "name": "Afzal Alam",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-237"
      }
    },
    "stops": [
      {
        "id": "stop-37-1",
        "name": "GOVINDPURA BIJLI GATE",
        "sequence": 1,
        "scheduledTime": "8:15",
        "estimatedTime": "8:15",
        "coordinates": {
          "latitude": 23.25191,
          "longitude": 77.437
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-37-2",
        "name": "APSARA TALKIES",
        "sequence": 2,
        "scheduledTime": "8:17",
        "estimatedTime": "8:17",
        "coordinates": {
          "latitude": 23.2528,
          "longitude": 77.4286
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-37-3",
        "name": "NEMA CHAURAHA",
        "sequence": 3,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.2678,
          "longitude": 77.417
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-37-4",
        "name": "ASHOKA GARDEN PANI KI TANKI",
        "sequence": 4,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.2658,
          "longitude": 77.41378
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-37-5",
        "name": "ASHOKA GARDEN THANA",
        "sequence": 5,
        "scheduledTime": "8:32",
        "estimatedTime": "8:32",
        "coordinates": {
          "latitude": 23.2745,
          "longitude": 77.3975
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-37-6",
        "name": "FAMOUS JUICE CENTRE",
        "sequence": 6,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.28235,
          "longitude": 77.39075
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-37-7",
        "name": "SANGAM TENET HOUSE",
        "sequence": 7,
        "scheduledTime": "8:38",
        "estimatedTime": "8:38",
        "coordinates": {
          "latitude": 23.28104,
          "longitude": 77.37772
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-37-8",
        "name": "PUSHPA NAGAR",
        "sequence": 8,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.28095,
          "longitude": 77.36065
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-37-9",
        "name": "HABIBIYA SCHOOL",
        "sequence": 9,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.2966,
          "longitude": 77.3571
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-37-10",
        "name": "SISTec GN",
        "sequence": 10,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-38",
    "routeNumber": "Route 38",
    "title": "KURAWAR",
    "origin": "RAUKHEDI",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "7:25",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#F59E0B",
    "activeBus": {
      "id": "bus-38",
      "routeId": "route-38",
      "plateNumber": "MP-04-HE-2038",
      "capacity": 52,
      "occupiedSeats": 40,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 43,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.47036,
        "longitude": 76.97872
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-38-1",
      "driver": {
        "id": "drv-38",
        "name": "Om Prakash",
        "phone": "+91 7880131535",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-138"
      },
      "conductor": {
        "id": "cnd-38",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-238"
      }
    },
    "stops": [
      {
        "id": "stop-38-1",
        "name": "RAUKHEDI",
        "sequence": 1,
        "scheduledTime": "7:25",
        "estimatedTime": "7:25",
        "coordinates": {
          "latitude": 23.47036,
          "longitude": 76.97872
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-38-2",
        "name": "KHARDONE KALA",
        "sequence": 2,
        "scheduledTime": "7:35",
        "estimatedTime": "7:35",
        "coordinates": {
          "latitude": 23.4759,
          "longitude": 77.0161
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-38-3",
        "name": "MOHAMMAD PUR",
        "sequence": 3,
        "scheduledTime": "7:45",
        "estimatedTime": "7:45",
        "coordinates": {
          "latitude": 23.46704,
          "longitude": 77.01722
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-38-4",
        "name": "TALEN ROAD",
        "sequence": 4,
        "scheduledTime": "7:55",
        "estimatedTime": "7:55",
        "coordinates": {
          "latitude": 23.4848,
          "longitude": 77.0166
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-38-5",
        "name": "BHANDARI BUILDING",
        "sequence": 5,
        "scheduledTime": "8:00",
        "estimatedTime": "8:00",
        "coordinates": {
          "latitude": 23.4903,
          "longitude": 77.0176
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-38-6",
        "name": "KURAWAR MANDI",
        "sequence": 6,
        "scheduledTime": "8:05",
        "estimatedTime": "8:05",
        "coordinates": {
          "latitude": 23.49631,
          "longitude": 77.01844
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-38-7",
        "name": "KURAWAR STAND",
        "sequence": 7,
        "scheduledTime": "8:07",
        "estimatedTime": "8:07",
        "coordinates": {
          "latitude": 23.5049,
          "longitude": 77.0233
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-38-8",
        "name": "SISTec GN",
        "sequence": 8,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-39",
    "routeNumber": "Route 39",
    "title": "BAIRAGARH",
    "origin": "TUMDA",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:20",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#A78BFA",
    "activeBus": {
      "id": "bus-39",
      "routeId": "route-39",
      "plateNumber": "MP-04-HE-2039",
      "capacity": 52,
      "occupiedSeats": 41,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 44,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.26513,
        "longitude": 77.29499
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-39-1",
      "driver": {
        "id": "drv-39",
        "name": "Roop Singh",
        "phone": "+91 7880131539",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-139"
      },
      "conductor": {
        "id": "cnd-39",
        "name": "Afzal Alam",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-239"
      }
    },
    "stops": [
      {
        "id": "stop-39-1",
        "name": "TUMDA",
        "sequence": 1,
        "scheduledTime": "8:20",
        "estimatedTime": "8:20",
        "coordinates": {
          "latitude": 23.26513,
          "longitude": 77.29499
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-39-2",
        "name": "SALAM BARKHEDA",
        "sequence": 2,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.2673,
          "longitude": 77.3042
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-39-3",
        "name": "BHOURI",
        "sequence": 3,
        "scheduledTime": "8:22",
        "estimatedTime": "8:22",
        "coordinates": {
          "latitude": 23.2693,
          "longitude": 77.3144
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-39-4",
        "name": "AKASH MARRIAGE GARDEN",
        "sequence": 4,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.271,
          "longitude": 77.3236
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-39-5",
        "name": "BAIRAGARH BUS STAND",
        "sequence": 5,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.272,
          "longitude": 77.332
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-39-6",
        "name": "CHANCHAL CHAURAHA",
        "sequence": 6,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.27412,
          "longitude": 77.33994
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-39-7",
        "name": "HALALPUR BUS STAND",
        "sequence": 7,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.2722,
          "longitude": 77.3607
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-39-8",
        "name": "LALGHATI CHAURAHA",
        "sequence": 8,
        "scheduledTime": "8:52",
        "estimatedTime": "8:52",
        "coordinates": {
          "latitude": 23.27991,
          "longitude": 77.36201
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-39-9",
        "name": "SISTec GN",
        "sequence": 9,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-41",
    "routeNumber": "Route 41",
    "title": "KALA PEEPAL",
    "origin": "SHUJALPUR",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "6:30",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#F43F5E",
    "activeBus": {
      "id": "bus-41",
      "routeId": "route-41",
      "plateNumber": "MP-04-HE-2041",
      "capacity": 52,
      "occupiedSeats": 43,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 46,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.40236,
        "longitude": 76.72044
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-41-1",
      "driver": {
        "id": "drv-41",
        "name": "Shiv Prasad",
        "phone": "+91 7880131541",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-141"
      },
      "conductor": {
        "id": "cnd-41",
        "name": "Afzal Alam",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-241"
      }
    },
    "stops": [
      {
        "id": "stop-41-1",
        "name": "SHUJALPUR",
        "sequence": 1,
        "scheduledTime": "6:30",
        "estimatedTime": "6:30",
        "coordinates": {
          "latitude": 23.40236,
          "longitude": 76.72044
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-41-2",
        "name": "SATANKHEDHI",
        "sequence": 2,
        "scheduledTime": "7:15",
        "estimatedTime": "7:15",
        "coordinates": {
          "latitude": 23.3797,
          "longitude": 76.77803
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-41-3",
        "name": "KALA PIPAL PANCHMUKHI CHAURAHA",
        "sequence": 3,
        "scheduledTime": "7:30",
        "estimatedTime": "7:30",
        "coordinates": {
          "latitude": 23.35,
          "longitude": 76.8369
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-41-4",
        "name": "KALA PIPAL GAON",
        "sequence": 4,
        "scheduledTime": "7:35",
        "estimatedTime": "7:35",
        "coordinates": {
          "latitude": 23.3491,
          "longitude": 76.8453
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-41-5",
        "name": "NAANDANI",
        "sequence": 5,
        "scheduledTime": "7:45",
        "estimatedTime": "7:45",
        "coordinates": {
          "latitude": 23.33,
          "longitude": 76.8947
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-41-6",
        "name": "MUNDLA",
        "sequence": 6,
        "scheduledTime": "7:55",
        "estimatedTime": "7:55",
        "coordinates": {
          "latitude": 23.30531,
          "longitude": 76.92281
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-41-7",
        "name": "CHANDBAD",
        "sequence": 7,
        "scheduledTime": "8:05",
        "estimatedTime": "8:05",
        "coordinates": {
          "latitude": 23.29853,
          "longitude": 76.94764
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-41-8",
        "name": "SHYAMPUR",
        "sequence": 8,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.28,
          "longitude": 77.02
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-41-9",
        "name": "SISTec GN10",
        "sequence": 9,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.299,
          "longitude": 77.3509
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-44",
    "routeNumber": "Route 44",
    "title": "AADHAR HOSPITAL",
    "origin": "AADHAR HOSPITAL BHANPUR",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:40",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#10B981",
    "activeBus": {
      "id": "bus-44",
      "routeId": "route-44",
      "plateNumber": "MP-04-HE-2044",
      "capacity": 52,
      "occupiedSeats": 46,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 49,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.29305,
        "longitude": 77.41002
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-44-1",
      "driver": {
        "id": "drv-44",
        "name": "Shabaz",
        "phone": "+91 7880131544",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-144"
      },
      "conductor": {
        "id": "cnd-44",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-244"
      }
    },
    "stops": [
      {
        "id": "stop-44-1",
        "name": "AADHAR HOSPITAL BHANPUR",
        "sequence": 1,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.29305,
          "longitude": 77.41002
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-44-2",
        "name": "KAROND SQUARE",
        "sequence": 2,
        "scheduledTime": "8:43",
        "estimatedTime": "8:43",
        "coordinates": {
          "latitude": 23.2995,
          "longitude": 77.397
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-44-3",
        "name": "SANJEEV NAGAR MAIN ROAD",
        "sequence": 3,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.30239,
          "longitude": 77.38894
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-44-4",
        "name": "NEW JAIL ROAD",
        "sequence": 4,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.307,
          "longitude": 77.382
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-44-5",
        "name": "SISTec GN",
        "sequence": 5,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-46",
    "routeNumber": "Route 46",
    "title": "SHAMSHABAD",
    "origin": "SHAMSHABAD",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "7:30",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#EC4899",
    "activeBus": {
      "id": "bus-46",
      "routeId": "route-46",
      "plateNumber": "MP-04-HE-2046",
      "capacity": 52,
      "occupiedSeats": 48,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 36,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.81003,
        "longitude": 77.48995
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-46-1",
      "driver": {
        "id": "drv-46",
        "name": "Salim Miya",
        "phone": "+91 7880131546",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-146"
      },
      "conductor": {
        "id": "cnd-46",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-246"
      }
    },
    "stops": [
      {
        "id": "stop-46-1",
        "name": "SHAMSHABAD",
        "sequence": 1,
        "scheduledTime": "7:30",
        "estimatedTime": "7:30",
        "coordinates": {
          "latitude": 23.81003,
          "longitude": 77.48995
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-46-2",
        "name": "MAHANEEM CIRCLE",
        "sequence": 2,
        "scheduledTime": "7:55",
        "estimatedTime": "7:55",
        "coordinates": {
          "latitude": 23.77064,
          "longitude": 77.47688
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-46-3",
        "name": "DILLOD",
        "sequence": 3,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.67666,
          "longitude": 77.45891
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-46-4",
        "name": "ACHARPURA",
        "sequence": 4,
        "scheduledTime": "9:05",
        "estimatedTime": "9:05",
        "coordinates": {
          "latitude": 23.315,
          "longitude": 77.39
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-46-5",
        "name": "SISTec GN",
        "sequence": 5,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-48",
    "routeNumber": "Route 48",
    "title": "AWADHPURI",
    "origin": "AWADHPURI BDA COLONY",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:10",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#6366F1",
    "activeBus": {
      "id": "bus-48",
      "routeId": "route-48",
      "plateNumber": "MP-04-HE-2048",
      "capacity": 52,
      "occupiedSeats": 38,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 38,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.22004,
        "longitude": 77.47197
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-48-1",
      "driver": {
        "id": "drv-48",
        "name": "Ismail",
        "phone": "+91 7880131548",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-148"
      },
      "conductor": {
        "id": "cnd-48",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-248"
      }
    },
    "stops": [
      {
        "id": "stop-48-1",
        "name": "AWADHPURI BDA COLONY",
        "sequence": 1,
        "scheduledTime": "8:10",
        "estimatedTime": "8:10",
        "coordinates": {
          "latitude": 23.22004,
          "longitude": 77.47197
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-48-2",
        "name": "VIDYA SAGAR",
        "sequence": 2,
        "scheduledTime": "8:15",
        "estimatedTime": "8:15",
        "coordinates": {
          "latitude": 23.22264,
          "longitude": 77.4674
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-48-3",
        "name": "BARKHEDA PATHANI",
        "sequence": 3,
        "scheduledTime": "8:20",
        "estimatedTime": "8:20",
        "coordinates": {
          "latitude": 23.225,
          "longitude": 77.465
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-48-4",
        "name": "PATHANI CHAURAHA",
        "sequence": 4,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.22622,
          "longitude": 77.46093
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-48-5",
        "name": "SHAKTI NAGAR DURGA MANDIR",
        "sequence": 5,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.22907,
          "longitude": 77.459
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-48-6",
        "name": "SPS SAKET NAGAR",
        "sequence": 6,
        "scheduledTime": "8:32",
        "estimatedTime": "8:32",
        "coordinates": {
          "latitude": 23.23179,
          "longitude": 77.45293
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-48-7",
        "name": "RRL TIRAHA",
        "sequence": 7,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.23304,
          "longitude": 77.44802
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-48-8",
        "name": "BHOPAL FRACTURE HOSPITAL",
        "sequence": 8,
        "scheduledTime": "8:37",
        "estimatedTime": "8:37",
        "coordinates": {
          "latitude": 23.2334,
          "longitude": 77.4412
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-48-9",
        "name": "QUARTER",
        "sequence": 9,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.2381,
          "longitude": 77.4352
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-48-10",
        "name": "BANS MANDI CHAURAHA",
        "sequence": 10,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.2318,
          "longitude": 77.41431
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-48-11",
        "name": "MANIT SQUARE",
        "sequence": 11,
        "scheduledTime": "8:47",
        "estimatedTime": "8:47",
        "coordinates": {
          "latitude": 23.215,
          "longitude": 77.4067
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-48-12",
        "name": "VAISHALI NAGAR",
        "sequence": 12,
        "scheduledTime": "8:50",
        "estimatedTime": "8:50",
        "coordinates": {
          "latitude": 23.2206,
          "longitude": 77.3961
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-48-13",
        "name": "SISTec GN",
        "sequence": 13,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-50",
    "routeNumber": "Route 50",
    "title": "NARIYALKHEDA",
    "origin": "BHOPAL TALKIES",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:35",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#14B8A6",
    "activeBus": {
      "id": "bus-50",
      "routeId": "route-50",
      "plateNumber": "MP-04-HE-2050",
      "capacity": 52,
      "occupiedSeats": 40,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 40,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.26806,
        "longitude": 77.40162
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-50-1",
      "driver": {
        "id": "drv-50",
        "name": "Rashid",
        "phone": "+91 9826546898",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-150"
      },
      "conductor": {
        "id": "cnd-50",
        "name": "Taranjeet Singh",
        "phone": "+91 7987760314",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-250"
      }
    },
    "stops": [
      {
        "id": "stop-50-1",
        "name": "BHOPAL TALKIES",
        "sequence": 1,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.26806,
          "longitude": 77.40162
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-50-2",
        "name": "QAZI CAMP SUPER BAZAR",
        "sequence": 2,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.2719,
          "longitude": 77.3999
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-50-3",
        "name": "CHOUKSEY NAGAR",
        "sequence": 3,
        "scheduledTime": "8:41",
        "estimatedTime": "8:41",
        "coordinates": {
          "latitude": 23.27498,
          "longitude": 77.39806
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-50-4",
        "name": "DIG BUNGLOW",
        "sequence": 4,
        "scheduledTime": "8:42",
        "estimatedTime": "8:42",
        "coordinates": {
          "latitude": 23.27712,
          "longitude": 77.39706
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-50-5",
        "name": "NARIYAL KHEDA",
        "sequence": 5,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.28012,
          "longitude": 77.39506
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-50-6",
        "name": "SISTec GN",
        "sequence": 6,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  },
  {
    "id": "route-51",
    "routeNumber": "Route 51",
    "title": "GULMOHAR",
    "origin": "SAI BOARD",
    "destination": "SISTec Gandhinagar Campus",
    "shift": "Morning Drop",
    "departureTime": "8:05",
    "arrivalTime": "09:15 AM",
    "estimatedDurationMinutes": 60,
    "totalDistanceKm": 18.5,
    "color": "#EAB308",
    "activeBus": {
      "id": "bus-51",
      "routeId": "route-51",
      "plateNumber": "MP-04-HE-2051",
      "capacity": 52,
      "occupiedSeats": 41,
      "status": "ON_TIME",
      "statusNote": "On Schedule \u2022 W.E.F 10-08-2026",
      "currentSpeedKmh": 41,
      "heading": 45,
      "currentCoordinates": {
        "latitude": 23.18799,
        "longitude": 77.44193
      },
      "currentWaypointIndex": 0,
      "currentStopIndex": 0,
      "nextStopId": "stop-51-1",
      "driver": {
        "id": "drv-51",
        "name": "Aslam",
        "phone": "+91 9752631551",
        "photoUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
        "rating": 4.9,
        "experienceYears": 10,
        "badgeNumber": "DRV-151"
      },
      "conductor": {
        "id": "cnd-51",
        "name": "Afzal Alam",
        "phone": "+91 9893837199",
        "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "employeeId": "CND-251"
      }
    },
    "stops": [
      {
        "id": "stop-51-1",
        "name": "SAI BOARD",
        "sequence": 1,
        "scheduledTime": "8:05",
        "estimatedTime": "8:05",
        "coordinates": {
          "latitude": 23.18799,
          "longitude": 77.44193
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": true,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-2",
        "name": "MAHENDRA PETROL PUMP",
        "sequence": 2,
        "scheduledTime": "8:08",
        "estimatedTime": "8:08",
        "coordinates": {
          "latitude": 23.1917,
          "longitude": 77.4419
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": true,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-3",
        "name": "SHAHPURA THANA",
        "sequence": 3,
        "scheduledTime": "8:12",
        "estimatedTime": "8:12",
        "coordinates": {
          "latitude": 23.1948,
          "longitude": 77.435
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-4",
        "name": "AURA MALL",
        "sequence": 4,
        "scheduledTime": "8:17",
        "estimatedTime": "8:17",
        "coordinates": {
          "latitude": 23.198,
          "longitude": 77.4315
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-5",
        "name": "GULMOHAR",
        "sequence": 5,
        "scheduledTime": "8:20",
        "estimatedTime": "8:20",
        "coordinates": {
          "latitude": 23.20006,
          "longitude": 77.43018
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-6",
        "name": "BANSKHEDI CHAURAHA",
        "sequence": 6,
        "scheduledTime": "8:22",
        "estimatedTime": "8:22",
        "coordinates": {
          "latitude": 23.20179,
          "longitude": 77.42613
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-7",
        "name": "MANISHA MARKET",
        "sequence": 7,
        "scheduledTime": "8:24",
        "estimatedTime": "8:24",
        "coordinates": {
          "latitude": 23.20751,
          "longitude": 77.41998
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-8",
        "name": "CHUNA BHATTI CHAURAHA",
        "sequence": 8,
        "scheduledTime": "8:25",
        "estimatedTime": "8:25",
        "coordinates": {
          "latitude": 23.2113,
          "longitude": 77.4191
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-9",
        "name": "GUT HOSPITAL",
        "sequence": 9,
        "scheduledTime": "8:27",
        "estimatedTime": "8:27",
        "coordinates": {
          "latitude": 23.2156,
          "longitude": 77.4078
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-10",
        "name": "KOLAR TIRAHA",
        "sequence": 10,
        "scheduledTime": "8:30",
        "estimatedTime": "8:30",
        "coordinates": {
          "latitude": 23.21828,
          "longitude": 77.40493
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-11",
        "name": "RAHUL NAGAR/PANCHSHEEL PULIYA",
        "sequence": 11,
        "scheduledTime": "8:35",
        "estimatedTime": "8:35",
        "coordinates": {
          "latitude": 23.22003,
          "longitude": 77.40199
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-12",
        "name": "VAISHALI NAGAR",
        "sequence": 12,
        "scheduledTime": "8:38",
        "estimatedTime": "8:38",
        "coordinates": {
          "latitude": 23.222,
          "longitude": 77.398
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-13",
        "name": "KAMLA NAGAR THANA",
        "sequence": 13,
        "scheduledTime": "8:40",
        "estimatedTime": "8:40",
        "coordinates": {
          "latitude": 23.224,
          "longitude": 77.3921
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-14",
        "name": "NEHRU NAGAR",
        "sequence": 14,
        "scheduledTime": "8:42",
        "estimatedTime": "8:42",
        "coordinates": {
          "latitude": 23.22755,
          "longitude": 77.38855
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-15",
        "name": "DEPOT CHAURAHA",
        "sequence": 15,
        "scheduledTime": "8:45",
        "estimatedTime": "8:45",
        "coordinates": {
          "latitude": 23.26453,
          "longitude": 77.38133
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      },
      {
        "id": "stop-51-16",
        "name": "SISTec GN",
        "sequence": 16,
        "scheduledTime": "9:15",
        "estimatedTime": "9:15",
        "coordinates": {
          "latitude": 23.2985,
          "longitude": 77.351
        },
        "landmark": "Scheduled Pickup Point",
        "isPassed": false,
        "isNext": false,
        "distanceFromPreviousKm": 1.8
      }
    ]
  }
];
