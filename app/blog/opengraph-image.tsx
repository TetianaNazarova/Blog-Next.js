import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
    width: 1200,
    height: 630,
}

const titles: Params = {
    'first': 'Hello First!',
    'second': 'Hello Second!',
}

export const contentType = 'image/png'
type Params = {
    first: string;
    second: string;
    [key: string]: string;
};

export default async function Image({ params }: any) {

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 84,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <div style={{ margin: 25 }}>{titles[params.slug]}</div>
                <div style={{ margin: 25, fontSize: 32 }}>This is a desc of the blog post</div>
            </div>
        ),
        {
            ...size,
        }
    )
}
