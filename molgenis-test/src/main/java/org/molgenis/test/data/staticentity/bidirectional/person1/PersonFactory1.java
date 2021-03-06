package org.molgenis.test.data.staticentity.bidirectional.person1;

import org.molgenis.data.AbstractSystemEntityFactory;
import org.molgenis.data.populate.EntityPopulator;
import org.molgenis.test.data.staticentity.bidirectional.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PersonFactory1 extends AbstractSystemEntityFactory<Person, PersonMetaData1, String>
{
	@Autowired
	PersonFactory1(PersonMetaData1 personMeta, EntityPopulator entityPopulator)
	{
		super(Person.class, personMeta, entityPopulator);
	}
}
