package org.molgenis.data.jobs.model;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.molgenis.data.jobs.model.dummy.DummyJobExecution;
import org.molgenis.data.jobs.model.dummy.DummyJobExecutionFactory;
import org.molgenis.data.jobs.model.dummy.DummyJobExecutionMetadata;
import org.molgenis.test.data.AbstractMolgenisSpringTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

@ContextConfiguration(classes = { DummyJobExecutionFactory.class, DummyJobExecutionMetadata.class,
		JobExecutionMetaData.class })
public class JobExecutionTest extends AbstractMolgenisSpringTest
{
	@Autowired
	private DummyJobExecutionFactory factory;
	private DummyJobExecution jobExecution;

	@BeforeMethod
	public void beforeMethod()
	{
		jobExecution = factory.create();
	}

	@Test
	public void testAppendLog() throws Exception
	{
		String message1 = "Small message 1\n";
		String message2 = "Small message 2\n";

		jobExecution.appendLog(message1);
		jobExecution.appendLog(message2);

		assertEquals(jobExecution.getLog(), StringUtils.join(message1, message2));
	}

	@Test
	public void testAppendLogTruncates() throws Exception
	{
		int i = 0;
		while (StringUtils.length(jobExecution.getLog()) < JobExecution.MAX_LOG_LENGTH)
		{
			jobExecution.appendLog("Small message " + i++ + "\n");
		}
		String truncatedLog = jobExecution.getLog();
		assertEquals(truncatedLog.length(), JobExecution.MAX_LOG_LENGTH, "Log message grows up to MAX_LOG_LENGTH");

		assertTrue(truncatedLog.startsWith(JobExecution.TRUNCATION_BANNER),
				"Truncated log should start with TRUNCATION_BANNER");
		assertTrue(truncatedLog.endsWith(JobExecution.TRUNCATION_BANNER),
				"Truncated log should end with TRUNCATION_BANNER");

		jobExecution.appendLog("Ignored");
		assertEquals(jobExecution.getLog(), truncatedLog, "Once truncated, the log should stop appending");
	}

	@Test
	public void testSetProgressMessageAbbreviates()
	{
		String longMessage = RandomStringUtils.random(300);
		jobExecution.setProgressMessage(longMessage);
		String actual = jobExecution.getProgressMessage();
		assertEquals(actual.length(), JobExecution.MAX_PROGRESS_MESSAGE_LENGTH);
		String common = StringUtils.getCommonPrefix(actual, longMessage);
		assertEquals(actual, common + "...");
	}

}