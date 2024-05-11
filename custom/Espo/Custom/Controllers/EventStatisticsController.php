<?php

namespace Espo\Custom\Controllers;

use Espo\Core\Api\Request;
use Espo\Core\Api\Response;
use Espo\ORM\EntityManager;

class EventStatisticsController {

    public function __construct(private EntityManager $entityManager) {}

    public function getActionIncome(Request $request, Response $response): string 
    {
        $eventId = $request->getRouteParam('eventId');

        $selectParams = [
            'eventId' => $eventId,
            'status' => 'paid'
        ];

        $tickets = $this->entityManager
            ->getRepository('Ticket')
            ->where($selectParams)
            ->find();

        return json_encode( 
            array(
                'income' => $this->summariseByPrice($tickets),
                'incomeCash' => 
                    $this->summariseByPrice(
                        $this->filterByPaymentMethod($tickets, 'cash')
                    ),
                'incomeIban' => 
                    $this->summariseByPrice(
                        $this->filterByPaymentMethod($tickets, 'iban')
                    )
            )
        );
    }

    private function filterByPaymentMethod($tickets, $paymentMethod)
    {
        $filteredTickets = [];
        foreach($tickets as $ticket) {
            if ($ticket->get('paymentMethod') == $paymentMethod) {
                array_push($filteredTickets, $ticket);
            }
        }
        return $filteredTickets;
    }

    private function summariseByPrice($tickets)
    {
        $totalPrice = 0;
        foreach($tickets as $ticket) {
            $totalPrice += $ticket->get('price');
        }
        return $totalPrice;
    }
}