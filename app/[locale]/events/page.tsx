import { NextPage } from 'next'
import SignupForm from '../_components/Events/SignupForm'
import { fetchAllEvents } from '@/utils/stapi-utils';
import FeaturedItems from '../_components/FeaturedItems/FeaturedItems';

interface Props {}
const infoText= (
    <>
    <p className='copy'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, obcaecati reiciendis officiis reprehenderit tenetur, earum dolorem suscipit nulla id consequuntur deleniti veniam inventore magni esse molestias voluptatem cupiditate ab autem.
    </p>
    <p className='copy'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, obcaecati reiciendis officiis reprehenderit tenetur, earum dolorem suscipit nulla id consequuntur deleniti veniam inventore magni esse molestias voluptatem cupiditate ab autem.
    </p>
    <p className='copy'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, obcaecati reiciendis officiis reprehenderit tenetur, earum dolorem suscipit nulla id consequuntur deleniti veniam inventore magni esse molestias voluptatem cupiditate ab autem.
    </p>
    </>
);
const headline = "You want to stay tuned for our events"


const Page = async() => {
const allEvents = await fetchAllEvents()
console.log(allEvents)
  return (
    <main className='events-page'>
    <SignupForm infoText={infoText} headline={headline} />
    <FeaturedItems items= {allEvents} itemType="event"  headline={headline}/>
  </main>
  )
}


export default Page