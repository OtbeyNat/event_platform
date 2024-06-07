import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getUserById } from '@/lib/actions/user.actions'
// import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({ params: {id}, searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth();

    if (!sessionClaims) return;
    const userId = sessionClaims?.userId as string;
    // console.log(userId);
    const profileId = id === 'self' ? userId : id;
    // console.log(profileId);
    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;
    const organizedEvents = await getEventsByUser({ userId: profileId, page: eventsPage });

    const profileInfo = await getUserById(profileId);
    // console.log(profileInfo)
    // const orders = await getOrdersByUser({ userId, page: ordersPage})

    // const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

    return (
    <>
        {/* My Tickets */}
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
            <span className='flex gap-5'>
                <h2 className='h2-bold text-center sm:text-left text-primary-500 capitalize'>{id === 'self' ? "My Tickets": profileInfo.firstName + ' ' + profileInfo.lastName}</h2>
                {id !== 'self' && <Image
                    src={profileInfo.photo}
                    alt='profile photo'
                    width={50}
                    height={50}
                />}
            </span>
            <Button asChild size="lg" className="button hidden sm:flex">
                <Link href="/#events">
                Explore More Events
                </Link>
            </Button>
            </div>
        </section>

        {/* {id ==='self' && <section className="wrapper my-8">
            <Collection 
            data={orderedEvents}
            emptyTitle="No event tickets"
            emptyStateSubtext="There are plenty of exciting events to explore!"
            collectionType="My_Tickets"
            limit={3}
            page={ordersPage}
            urlParamName="ordersPage"
            totalPages={orders?.totalPages}
            />
        </section>} */}

        {/* Events Organized */}
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
            <Button asChild size="lg" className="button hidden sm:flex">
                <Link href="/events/create">
                Create New Event
                </Link>
            </Button>
            </div>
        </section>

        <section className="wrapper my-8">
            <Collection 
            data={organizedEvents?.data}
            emptyTitle="No events have been created yet"
            emptyStateSubtext="Go create some now"
            collectionType="Events_Organized"
            limit={3}
            page={eventsPage}
            urlParamName="eventsPage"
            totalPages={organizedEvents?.totalPages}
            />
        </section>
    </>
  )
}

export default ProfilePage