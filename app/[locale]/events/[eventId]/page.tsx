import SignupForm from '../../_components/Events/SignupForm'
import { fetchDataFromStrapi, fetchIndividualEvent } from '@/utils/stapi-utils'
import ReactMarkdown from 'react-markdown'

const Page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const { eventId } = await params
  const event = await fetchIndividualEvent(eventId)
  const descriptionMarkdown = <ReactMarkdown>{event.description}</ReactMarkdown>

  const pricing = {
    singlePrice: event.singlePrice,
    sharedPrice: event.sharedPrice,
  }

  return (
    <main className="events-page">
      <SignupForm
        headline={event.name}
        infoText={descriptionMarkdown}
        buttonLabel="Sign Up"
        pricing={pricing}
        eventId={eventId}
      />
    </main>
  )
}

export default Page

export async function generateStaticParams() {
  try {
    const events = await fetchDataFromStrapi('events')
    return events.map((event: any) => ({
      eventId: String(event.id),
    }))
  } catch (error) {
    return []
  }
}