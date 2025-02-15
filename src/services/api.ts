export const fetchCourses = async () => {
  try {
    console.log('Client: Starting fetch request to proxy');
    const response = await fetch('/api/courses');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Client: Raw response:', JSON.stringify(data, null, 2));

    if (data?.result?.data?.json?.courses) {
      const courses = data.result.data.json.courses.map((course: any) => ({
        id: course.courseId.toString(),
        title: course.name || '',
        description: course.outline?.[0]?.name || '',
        courseDescription: course.wpData?.courseDescription || '',
        coursePartner: course.wpData?.coursePartner?.filter(partner => partner && partner.logo) || [],
        thumbnailImage: course.wpData?.thumbnailImage || '',
        courseTopic: course.wpData?.courseTopic || []
      }));
      console.log('Client: Extracted courses:', courses);
      return courses;
    }

    console.error('Client: Unexpected data structure:', data);
    return [];
  } catch (error) {
    console.error('Client: Error in fetchCourses:', error);
    return [];
  }
}; 