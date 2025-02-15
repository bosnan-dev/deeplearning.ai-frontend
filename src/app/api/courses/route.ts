import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Proxy: Starting fetch request');
    const response = await fetch(
      'https://learnext-7ux2hdwqk-dlai-eng.vercel.app/api/trpc/course.getAll?input={"json":{"isOnSale":true}}'
    );
    
    if (!response.ok) {
      console.error('Proxy: Response not OK:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Proxy: Raw data received:', JSON.stringify(data, null, 2));

    // Pass through the tRPC response without modification
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy: Error occurred:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch courses',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
} 