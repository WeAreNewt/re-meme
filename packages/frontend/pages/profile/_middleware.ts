import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const token = req.cookies["token"];
    const res = NextResponse.next();

    /* if (!token) {
        //res.headers.set("token", "");
        //res.cookie("token", "");
        return res;
    }

    const user = await getUser(token)

    if (user.message || user.error) {
        const newUser = await createUser(token);

        res.cookie("user", JSON.stringify(newUser));
        return res;
    }

    res.cookie("user", JSON.stringify(user)); */
    return res;
}