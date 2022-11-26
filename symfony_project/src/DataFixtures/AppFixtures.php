<?php

namespace App\DataFixtures;

use App\Entity\Conversation;
use App\Factory\UserFactory;
use App\Factory\MessageFactory;
use App\Factory\ConversationFactory;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

use App\Repository\ConversationRepository;


class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // créé 150 conversations uniques
        UserFactory::createMany(4);

        // mettre deux utilisateurs different dans chaque conversation
        // on ne doit pas avoir deux fois exactement meme conversation
        ConversationFactory::createMany(4, function () {
            return [
                'users' => UserFactory::randomSet(2),
            ];
        });

        
        MessageFactory::createMany(100);

        $manager->flush();
    }
}
