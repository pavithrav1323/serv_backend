import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GeocodeDto } from './dto/geocode.dto';

@Injectable()
export class UtilitiesService {
  constructor(private prisma: PrismaService) {}

  async geocode(dto: GeocodeDto) {
    // In a real application, you would integrate with a geocoding service like:
    // - Google Maps Geocoding API
    // - OpenStreetMap Nominatim
    // - Mapbox Geocoding API
    
    // For now, we'll return a mock response
    const mockLocation = {
      address: 'Mock Address',
      city: 'Mock City',
      state: 'Mock State',
      country: 'Mock Country',
      postalCode: '12345',
      formattedAddress: `${dto.latitude}, ${dto.longitude}`,
    };

    return {
      coordinates: { lat: dto.latitude, lng: dto.longitude },
      location: mockLocation,
    };
  }

  async getNotifications(userId: string, page = 1, limit = 10) {
    // In a real application, you would have a notifications table
    // For now, we'll return mock notifications
    const mockNotifications = [
      {
        id: '1',
        userId,
        title: 'Welcome to the system',
        message: 'Your account has been successfully created',
        type: 'info',
        isRead: false,
        createdAt: new Date(),
      },
      {
        id: '2',
        userId,
        title: 'Attendance reminder',
        message: 'Don\'t forget to check in for your shift',
        type: 'reminder',
        isRead: true,
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
      },
    ];

    return {
      notifications: mockNotifications,
      pagination: {
        page,
        limit,
        total: mockNotifications.length,
        pages: Math.ceil(mockNotifications.length / limit),
      },
    };
  }
} 