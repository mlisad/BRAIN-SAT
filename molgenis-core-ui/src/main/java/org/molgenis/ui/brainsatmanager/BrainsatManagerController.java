package org.molgenis.ui.brainsatmanager;

import static org.molgenis.ui.brainsatmanager.BrainsatManagerController.URI;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

import org.molgenis.ui.MolgenisPluginController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(URI)
public class BrainsatManagerController extends MolgenisPluginController
{
	public static final String ID = "brainsatmanager";
	public static final String URI = MolgenisPluginController.PLUGIN_URI_PREFIX + ID;

	public BrainsatManagerController() {
		super(URI);
	}
	
	@RequestMapping(method = GET)
	public String init()
	{
		return "view-brainsatmanager";
	}
}