<?php

namespace Espo\Custom\Jobs;

use Espo\Core\Job\JobDataLess;
use Espo\ORM\EntityManager;

class MakeExpiredTicketsUnpaid implements JobDataLess
{
    public function __construct(private EntityManager $entityManager)
    {
    }

    public function run(): void 
    {
        $updateBunches = $this->entityManager
            ->getQueryBuilder()
            ->update()
            ->in('TicketsBunch')
            ->set(['status' => 'notPaid'])
            ->where([
                'bookedEnd<=' => date('Y-m-d H:i:s'),
                'status' => 'booked' 
            ])
            ->build();

        $this->entityManager->getQueryExecutor()->execute($updateBunches);

        $updateTickets = $this->entityManager
            ->getQueryBuilder()
            ->update()
            ->in('Ticket')
            ->set(['status' => 'notPaid'])
            ->where([
                'bookedEnd<=' => date('Y-m-d H:i:s'),
                'status' => 'booked' 
            ])
            ->build();

        $this->entityManager->getQueryExecutor()->execute($updateTickets);
    }    
}
