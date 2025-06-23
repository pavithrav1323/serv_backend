import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { UserRole } from '@prisma/client';
export declare class TeamsService {
    private prisma;
    constructor(prisma: PrismaService);
    createTeam(userId: string, dto: CreateTeamDto): Promise<{
        message: string;
        team: {
            members: {
                id: string;
                role: import(".prisma/client").$Enums.TeamRole;
                userId: string;
                joinedAt: Date;
                teamId: string;
            }[];
        } & {
            name: string;
            description: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string;
        };
    }>;
    updateTeam(teamId: string, dto: UpdateTeamDto, userId: string, userRole: UserRole): Promise<{
        message: string;
        team: {
            name: string;
            description: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string;
        };
    }>;
    addMember(teamId: string, dto: AddMemberDto, userId: string, userRole: UserRole): Promise<{
        message: string;
        member: {
            id: string;
            role: import(".prisma/client").$Enums.TeamRole;
            userId: string;
            joinedAt: Date;
            teamId: string;
        };
    }>;
    removeMember(teamId: string, memberId: string, userId: string, userRole: UserRole): Promise<{
        message: string;
    }>;
    getTeam(teamId: string): Promise<{
        creator: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
        };
        members: ({
            user: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            id: string;
            role: import(".prisma/client").$Enums.TeamRole;
            userId: string;
            joinedAt: Date;
            teamId: string;
        })[];
    } & {
        name: string;
        description: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
    }>;
    getMyTeams(userId: string): Promise<({
        creator: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
        };
        members: ({
            user: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            id: string;
            role: import(".prisma/client").$Enums.TeamRole;
            userId: string;
            joinedAt: Date;
            teamId: string;
        })[];
    } & {
        name: string;
        description: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string;
    })[]>;
    getAllTeams(page?: number, limit?: number): Promise<{
        teams: ({
            creator: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
            members: ({
                user: {
                    email: string;
                    firstName: string;
                    lastName: string;
                    id: string;
                };
            } & {
                id: string;
                role: import(".prisma/client").$Enums.TeamRole;
                userId: string;
                joinedAt: Date;
                teamId: string;
            })[];
        } & {
            name: string;
            description: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
}
