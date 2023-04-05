import { ApiProperty } from "@nestjs/swagger";

export class ResponseLoginDTO {
    @ApiProperty({ description: "Token for authenticate", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVwYmFAbWFpbC5jb20iLCJwYXNzd29yZCI6Im1hbnRhcGJybyIsImlhdCI6MTY4MDcwNTM0MSwiZXhwIjoxNjgwNzA1NDAxfQ.VPmLjZaOJ5ED_RA2-y7i-nqnN1usy-O6b3QvIIbrh9w" })
    access_token: String;
    @ApiProperty({ description: "Duration of valid token on second", example: "60s" })
    expiresIn: String;
}