import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
export declare class TeamsController {
    private teamsService;
    constructor(teamsService: TeamsService);
    createTeam(req: any, dto: CreateTeamDto): Promise<{
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
    updateTeam(req: any, id: string, dto: UpdateTeamDto): Promise<{
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
    addMember(req: any, id: string, dto: AddMemberDto): Promise<{
        message: string;
        member: {
            id: string;
            role: import(".prisma/client").$Enums.TeamRole;
            userId: string;
            joinedAt: Date;
            teamId: string;
        };
    }>;
    removeMember(req: any, id: string, memberId: string): Promise<{
        message: string;
    }>;
    getTeam(id: string): Promise<{
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
    getMyTeams(req: any): Promise<({
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
