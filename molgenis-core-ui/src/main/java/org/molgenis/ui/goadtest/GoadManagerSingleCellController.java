package org.molgenis.ui.goadtest;

import org.molgenis.ui.MolgenisPluginController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.molgenis.ui.goadtest.GoadManagerSingleCellController.URI;
import static org.springframework.web.bind.annotation.RequestMethod.GET;


@Controller
@RequestMapping(URI)
public class GoadManagerSingleCellController extends MolgenisPluginController
{
	public static final String ID = "goadmanagersinglecell";
	public static final String URI = MolgenisPluginController.PLUGIN_URI_PREFIX + ID;

	public GoadManagerSingleCellController() {
		super(URI);
	}

	@RequestMapping(method = GET)
	public String init()
	{
		return "view-brainsatmanager-single";
	}
}