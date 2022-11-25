<?php

namespace App\DataFixtures;

use App\Factory\MessageFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Factory\UserFactory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        UserFactory::createMany(150);
        // MessageFactory::createMany(150);

        $manager->flush();
    }
}
